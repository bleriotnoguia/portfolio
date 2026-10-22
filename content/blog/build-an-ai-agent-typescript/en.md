---
title: "Build your first AI agent in TypeScript"
description: "An agent is a model, a few tools and a loop. We build a customer support agent with the Anthropic SDK and a Next.js route handler, then make it safe enough for production."
date: 2026-10-13
tags: ["AI agents", "TypeScript", "Next.js", "Claude"]
---

"Agent" has become one of the most overloaded words in tech. Under the marketing, the idea is simple: a language model that can call functions you wrote, look at the results, and decide what to do next until the task is done.

In this tutorial we build a small support agent for an online shop. It can check an order, search the help center and open a refund request. We'll use TypeScript, the official Anthropic SDK and a Next.js route handler.

## What an agent really is

An agent is three things:

- **A model** that reads the conversation and decides what to do.
- **Tools**: functions in your code, each described with a name, a description and a schema for its inputs.
- **A loop**: you send the conversation, the model either answers or asks to call a tool, you run the tool, send the result back, and repeat.

The model never runs your code. It returns a request such as "call `get_order_status` with `orderId: "CMD-1042"`", your program runs it, and you decide what the model is allowed to do. That's what makes agents safe to build on.

## Setup

In an existing Next.js project:

```bash
npm install @anthropic-ai/sdk zod
```

Add your API key to `.env.local`. The SDK reads it automatically:

```bash
ANTHROPIC_API_KEY=your-key
```

## Step 1: describe a tool

A tool is a contract. The description matters as much as the code: it's what the model reads to decide when to use the tool.

```ts
import Anthropic from "@anthropic-ai/sdk";

const tools: Anthropic.Tool[] = [
  {
    name: "get_order_status",
    description:
      "Get the current status and delivery estimate of a customer order. Use it whenever the customer asks about an order.",
    input_schema: {
      type: "object",
      properties: {
        orderId: { type: "string", description: "Order ID, e.g. CMD-1042" },
      },
      required: ["orderId"],
      additionalProperties: false,
    },
  },
];
```

## Step 2: write the loop yourself, once

You won't keep this version, but writing it once shows exactly what happens. `db` stands for your own data layer.

```ts
const client = new Anthropic(); // reads ANTHROPIC_API_KEY

async function runTool(name: string, input: unknown): Promise<string> {
  if (name === "get_order_status") {
    const { orderId } = input as { orderId: string };
    const order = await db.orders.findById(orderId);
    return order
      ? JSON.stringify({ status: order.status, eta: order.eta })
      : `No order found with id ${orderId}`;
  }
  throw new Error(`Unknown tool: ${name}`);
}

export async function runAgent(question: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: question },
  ];

  for (let step = 0; step < 8; step++) {
    const response = await client.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      system:
        "You are the support assistant of an online shop. Answer in the customer's language.",
      tools,
      messages,
    });

    if (response.stop_reason === "refusal") {
      return "Sorry, I can't help with that request.";
    }

    if (response.stop_reason !== "tool_use") {
      return response.content
        .filter((block): block is Anthropic.TextBlock => block.type === "text")
        .map((block) => block.text)
        .join("\n");
    }

    // 1. Keep the model's turn, including its tool calls
    messages.push({ role: "assistant", content: response.content });

    // 2. Run every tool it asked for, and send all results back in one message
    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type !== "tool_use") continue;
      try {
        const content = await runTool(block.name, block.input);
        results.push({ type: "tool_result", tool_use_id: block.id, content });
      } catch (error) {
        results.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: String(error),
          is_error: true,
        });
      }
    }
    messages.push({ role: "user", content: results });
  }

  throw new Error("The agent did not finish within 8 steps");
}
```

Three details are worth noticing:

- **`stop_reason` drives the loop.** `tool_use` means "run my tools and come back"; anything else means the turn is over.
- **The model can ask for several tools at once.** Run them all and return every result in a single message.
- **Errors are results too.** When a tool fails, send the error back with `is_error: true`. The model can often recover, for example by asking the customer to check their order number.

## Step 3: let the SDK run the loop

In practice, the SDK's tool runner handles that loop for you. Tools are defined with Zod, so their inputs are validated before your code runs.

```ts
import Anthropic from "@anthropic-ai/sdk";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

const client = new Anthropic();

const getOrderStatus = betaZodTool({
  name: "get_order_status",
  description:
    "Get the current status and delivery estimate of a customer order.",
  inputSchema: z.object({
    orderId: z.string().describe("Order ID, e.g. CMD-1042"),
  }),
  run: async ({ orderId }) => {
    const order = await db.orders.findById(orderId);
    return order
      ? JSON.stringify({ status: order.status, eta: order.eta })
      : `No order found with id ${orderId}`;
  },
});

const searchHelpCenter = betaZodTool({
  name: "search_help_center",
  description:
    "Search the help center articles. Use it for questions about shipping, returns or payments.",
  inputSchema: z.object({
    query: z.string().describe("A short search query"),
  }),
  run: async ({ query }) => JSON.stringify(await helpCenter.search(query)),
});

const requestRefund = betaZodTool({
  name: "request_refund",
  description:
    "Open a refund request for an order. A team member reviews every request before any money moves.",
  inputSchema: z.object({
    orderId: z.string(),
    reason: z.string().describe("The customer's reason, in a few words"),
  }),
  run: async ({ orderId, reason }) => {
    const ticket = await tickets.create({ type: "refund", orderId, reason });
    return `Refund request ${ticket.id} created. A team member will review it within one business day.`;
  },
});

export async function answerCustomer(question: string): Promise<string> {
  const message = await client.beta.messages.toolRunner({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    max_iterations: 8,
    // If a safety classifier declines, retry on the model Anthropic recommends
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system:
      "You are the support assistant of an online shop. Answer in the customer's language. Never promise a refund: open a request instead.",
    tools: [getOrderStatus, searchHelpCenter, requestRefund],
    messages: [{ role: "user", content: question }],
  });

  if (message.stop_reason === "refusal") {
    return "Sorry, I can't help with that request.";
  }

  return message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}
```

Put this in `lib/support-agent.ts`. The tool runner and server-side fallbacks are beta features of the SDK, so pin your SDK version and read the changelog when you upgrade.

## Step 4: expose it with a route handler

The agent runs on the server, where your API key and your database live. A route handler in `app/api/support/route.ts` is enough:

```ts
import { answerCustomer } from "@/lib/support-agent";

export async function POST(request: Request) {
  const { question } = await request.json();

  if (typeof question !== "string" || question.length > 2000) {
    return Response.json(
      { error: "Send a question of 2,000 characters or less." },
      { status: 400 }
    );
  }

  const reply = await answerCustomer(question);
  return Response.json({ reply });
}
```

Your front end can now `POST` a question to `/api/support` and display the reply. For a chat interface, the next step is to stream the answer so text appears as it's written.

## Make it ready for production

A demo agent takes an afternoon. A production agent needs a few more decisions:

- **Bound the loop.** `max_iterations` stops an agent that goes in circles. Pick a number from your real conversations, not a guess.
- **Split read tools from write tools.** Reading an order is harmless. Anything that moves money, sends an email or deletes data should create a request that a person approves, like `request_refund` above.
- **Treat tool results as data, not instructions.** A help center article or a customer message can contain text that looks like an order. Your system prompt and your code decide what the agent may do, never the content it reads.
- **Log every step.** Keep the question, each tool call with its input and result, the final answer and the token usage. It's how you debug, and how you answer "why did it say that?"
- **Watch the cost.** Prompt caching makes a long, stable system prompt and tool list much cheaper on repeated calls, and a lighter model or a lower effort setting is often enough for simple support questions. Measure before choosing.
- **Build an evaluation set.** Fifty real questions with the expected behaviour, run on every change, will catch more regressions than any amount of manual testing.

## Where to go next

Our tools live inside the application. When you want the same tools to be available to several AI apps, such as your agent, Claude Desktop, or an IDE, the next step is to expose them through the Model Context Protocol. That's the subject of [MCP explained](/en/blog/mcp-explained).

If you're planning an agent for your product, [tell me about it](/en#contact).
