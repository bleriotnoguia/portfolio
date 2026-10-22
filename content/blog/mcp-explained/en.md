---
title: "MCP explained: give AI agents safe access to your app"
description: "The Model Context Protocol has become the standard way to plug tools and data into AI apps. What it is, when you need it, and a working server in TypeScript."
date: 2026-10-20
tags: ["MCP", "AI agents", "TypeScript"]
---

Before MCP, every AI application had its own way of connecting to tools. If you wanted your product to be usable from three AI apps, you wrote three integrations. If those apps wanted ten tools, each of them wrote ten integrations. It didn't scale.

The **Model Context Protocol** (MCP) fixes that. Anthropic published it as an open standard in November 2024, and it's now supported by a wide range of AI apps, IDEs and agent frameworks. It's often described as a USB-C port for AI applications: write one server for your app, and every compatible client can use it.

## Three roles: host, client and server

- **The host** is the AI application the user works in: Claude Desktop, Claude Code, an IDE, or your own agent.
- **The client** lives inside the host and holds the connection to one server. A host can run several clients at once.
- **The server** is your program. It exposes what your app can do and what it knows.

As the author of a product, you'll mostly write servers. The hosts already exist.

## What a server can expose

An MCP server offers three kinds of capabilities:

- **Tools** are actions the model can call: check an order, create a ticket, run a query. They're the MCP equivalent of the tools from [my agent tutorial](/en/blog/build-an-ai-agent-typescript).
- **Resources** are data the application can read and give to the model: a document, a database record, a file.
- **Prompts** are reusable templates the user can pick, such as "summarise this customer's history".

Most servers start with a few tools. Add resources and prompts when you have a clear need.

## Two ways to connect

- **stdio**: the host starts your server as a local process and talks to it through standard input and output. Simple and private, ideal for tools that run on the user's machine.
- **Streamable HTTP**: your server runs on the web and clients connect to it over HTTPS. That's the option for a hosted product, with proper authentication.

## Build a server in TypeScript

We'll expose the order lookup from the agent tutorial, plus the shipping policy as a resource. In a new folder:

```bash
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
```

Set `"type": "module"` in `package.json`, then create `src/server.ts`. `db` stands for your own data layer:

```ts
import { readFile } from "node:fs/promises";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "shop-orders", version: "1.0.0" });

// A tool: something the agent can do
server.registerTool(
  "get_order_status",
  {
    title: "Order status",
    description: "Get the current status and delivery estimate of a customer order.",
    inputSchema: { orderId: z.string().describe("Order ID, e.g. CMD-1042") },
  },
  async ({ orderId }) => {
    const order = await db.orders.findById(orderId);
    if (!order) {
      return {
        content: [{ type: "text", text: `No order found with id ${orderId}` }],
        isError: true,
      };
    }
    return {
      content: [
        { type: "text", text: JSON.stringify({ status: order.status, eta: order.eta }) },
      ],
    };
  }
);

// A resource: something the agent can read
server.registerResource(
  "shipping-policy",
  "docs://shipping-policy",
  {
    title: "Shipping policy",
    description: "Delivery times and costs by country",
    mimeType: "text/markdown",
  },
  async (uri) => ({
    contents: [{ uri: uri.href, text: await readFile("docs/shipping.md", "utf8") }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

Add a minimal `tsconfig.json`, then compile with `npx tsc`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  }
}
```

One trap with stdio servers: **never write to standard output** with `console.log`. That channel carries the protocol messages, and any stray text breaks them. Use `console.error` for your logs.

## Test it with the Inspector

The MCP Inspector is a small web interface that connects to your server, lists its tools and resources, and lets you call them by hand:

```bash
npx @modelcontextprotocol/inspector node dist/server.js
```

Check that each tool appears with a clear description, then call it with valid and invalid inputs. If a person can't understand when to use a tool from its description, a model won't either.

## Connect it to Claude Code or Claude Desktop

In Claude Code, one command registers the server:

```bash
claude mcp add shop-orders -- node /absolute/path/to/dist/server.js
```

In Claude Desktop, add it to `claude_desktop_config.json` (in `~/Library/Application Support/Claude/` on macOS, `%APPDATA%\Claude\` on Windows), then restart the app:

```json
{
  "mcpServers": {
    "shop-orders": {
      "command": "node",
      "args": ["/absolute/path/to/dist/server.js"]
    }
  }
}
```

You can now ask "Where is order CMD-1042?" and watch the model call your tool.

## Use a remote server from your own agent

Once your server runs over Streamable HTTP, your own code can use it too. The Claude API can connect to a remote MCP server directly, without a client in your code:

```ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const response = await client.beta.messages.create({
  model: "claude-opus-5-5",
  max_tokens: 16000,
  betas: ["mcp-client-2025-11-20"],
  mcp_servers: [
    { type: "url", url: "https://mcp.example.com/mcp", name: "shop-orders" },
  ],
  tools: [{ type: "mcp_toolset", mcp_server_name: "shop-orders" }],
  messages: [{ role: "user", content: "Where is order CMD-1042?" }],
});
```

The `mcp_servers` entry says where the server is, and the `mcp_toolset` entry makes its tools available to the model. This connector is a beta feature, so check the current documentation before relying on it.

## Security: treat a server like an API with superpowers

An MCP server gives a model direct access to your systems. The usual API rules apply, and a few more:

- **Least privilege.** Start with read-only tools. Add write tools one at a time, each with a narrow scope.
- **Authenticate remote servers.** A public URL with no authentication is an open door to your data. The MCP specification describes an OAuth-based flow for this.
- **Validate every input.** The schema is a first filter; your code still checks permissions and business rules.
- **Expect prompt injection.** Text that comes back from a tool, such as a customer message or a web page, can contain instructions aimed at the model. Never let a tool result alone trigger a sensitive action.
- **Ask before destructive actions.** Deleting, paying or sending should require a confirmation from a person.
- **Only install servers you trust.** A local MCP server runs with your user's permissions. Read the code or use servers from known publishers.

## MCP or plain tool use?

If your tools are only used by one agent inside your own product, plain tool use, as in the agent tutorial, is simpler: no extra process, no protocol. MCP pays off when the same capabilities must be available to several AI apps, to your team's tools, or to your customers' own agents.

That last case is worth thinking about. As more people work through AI assistants, an MCP server is becoming part of a product's public surface, next to its website and its API.

If you're wondering whether your product should have one, [let's talk about it](/en#contact).
