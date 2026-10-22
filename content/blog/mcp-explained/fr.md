---
title: "MCP expliqué : donner aux agents IA un accès sûr à votre application"
description: "Le Model Context Protocol est devenu la façon standard de brancher des outils et des données sur les applications IA. Ce que c'est, quand en avoir besoin, et un serveur fonctionnel en TypeScript."
date: 2026-10-20
tags: ["MCP", "Agents IA", "TypeScript"]
---

Avant MCP, chaque application IA avait sa propre façon de se connecter à des outils. Pour que votre produit soit utilisable depuis trois applications IA, il fallait écrire trois intégrations. Et si ces applications voulaient dix outils, chacune en écrivait dix. Ça ne passait pas à l'échelle.

Le **Model Context Protocol** (MCP) règle ce problème. Anthropic l'a publié comme standard ouvert en novembre 2024, et il est aujourd'hui pris en charge par un grand nombre d'applications IA, d'IDE et de frameworks d'agents. On le décrit souvent comme un port USB-C pour les applications IA : vous écrivez un serveur pour votre application, et tous les clients compatibles peuvent l'utiliser.

## Trois rôles : hôte, client et serveur

- **L'hôte** est l'application IA dans laquelle l'utilisateur travaille : Claude Desktop, Claude Code, un IDE, ou votre propre agent.
- **Le client** vit dans l'hôte et maintient la connexion avec un serveur. Un hôte peut faire tourner plusieurs clients à la fois.
- **Le serveur** est votre programme. Il expose ce que votre application sait faire et ce qu'elle sait.

En tant qu'éditeur d'un produit, vous écrirez surtout des serveurs. Les hôtes existent déjà.

## Ce qu'un serveur peut exposer

Un serveur MCP propose trois types de capacités :

- **Les outils** sont des actions que le modèle peut appeler : vérifier une commande, créer un ticket, lancer une requête. C'est l'équivalent MCP des outils de [mon tutoriel sur les agents](/fr/blog/build-an-ai-agent-typescript).
- **Les ressources** sont des données que l'application peut lire et donner au modèle : un document, un enregistrement en base, un fichier.
- **Les prompts** sont des modèles réutilisables que l'utilisateur peut choisir, comme « résume l'historique de ce client ».

La plupart des serveurs commencent avec quelques outils. Ajoutez ressources et prompts quand le besoin est clair.

## Deux façons de se connecter

- **stdio** : l'hôte lance votre serveur comme un processus local et lui parle via l'entrée et la sortie standard. Simple et privé, idéal pour des outils qui tournent sur la machine de l'utilisateur.
- **Streamable HTTP** : votre serveur tourne sur le web et les clients s'y connectent en HTTPS. C'est l'option pour un produit hébergé, avec une vraie authentification.

## Construire un serveur en TypeScript

On va exposer la recherche de commande du tutoriel sur les agents, plus la politique de livraison sous forme de ressource. Dans un nouveau dossier :

```bash
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
```

Ajoutez `"type": "module"` dans `package.json`, puis créez `src/server.ts`. `db` représente votre propre couche de données :

```ts
import { readFile } from "node:fs/promises";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "shop-orders", version: "1.0.0" });

// Un outil : quelque chose que l'agent peut faire
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

// Une ressource : quelque chose que l'agent peut lire
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

Ajoutez un `tsconfig.json` minimal, puis compilez avec `npx tsc` :

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

Un piège avec les serveurs stdio : **n'écrivez jamais sur la sortie standard** avec `console.log`. Ce canal transporte les messages du protocole, et tout texte parasite les casse. Utilisez `console.error` pour vos logs.

## Le tester avec l'Inspector

L'Inspector MCP est une petite interface web qui se connecte à votre serveur, liste ses outils et ses ressources, et vous permet de les appeler à la main :

```bash
npx @modelcontextprotocol/inspector node dist/server.js
```

Vérifiez que chaque outil apparaît avec une description claire, puis appelez-le avec des entrées valides et invalides. Si une personne ne comprend pas quand utiliser un outil en lisant sa description, un modèle non plus.

## Le connecter à Claude Code ou Claude Desktop

Dans Claude Code, une commande suffit pour enregistrer le serveur :

```bash
claude mcp add shop-orders -- node /chemin/absolu/vers/dist/server.js
```

Dans Claude Desktop, ajoutez-le à `claude_desktop_config.json` (dans `~/Library/Application Support/Claude/` sur macOS, `%APPDATA%\Claude\` sur Windows), puis redémarrez l'application :

```json
{
  "mcpServers": {
    "shop-orders": {
      "command": "node",
      "args": ["/chemin/absolu/vers/dist/server.js"]
    }
  }
}
```

Vous pouvez maintenant demander « Où en est la commande CMD-1042 ? » et voir le modèle appeler votre outil.

## Utiliser un serveur distant depuis votre propre agent

Une fois votre serveur accessible en Streamable HTTP, votre propre code peut aussi l'utiliser. L'API Claude sait se connecter directement à un serveur MCP distant, sans client dans votre code :

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
  messages: [{ role: "user", content: "Où en est la commande CMD-1042 ?" }],
});
```

L'entrée `mcp_servers` indique où se trouve le serveur, et l'entrée `mcp_toolset` rend ses outils disponibles pour le modèle. Ce connecteur est une fonctionnalité beta : vérifiez la documentation à jour avant de vous appuyer dessus.

## Sécurité : traitez un serveur comme une API aux super-pouvoirs

Un serveur MCP donne à un modèle un accès direct à vos systèmes. Les règles habituelles d'une API s'appliquent, plus quelques autres :

- **Le moindre privilège.** Commencez par des outils en lecture seule. Ajoutez les outils d'écriture un par un, chacun avec un périmètre étroit.
- **Authentifiez les serveurs distants.** Une URL publique sans authentification est une porte ouverte sur vos données. La spécification MCP décrit un mécanisme basé sur OAuth pour cela.
- **Validez chaque entrée.** Le schéma est un premier filtre ; votre code vérifie quand même les permissions et les règles métier.
- **Attendez-vous à l'injection de prompt.** Le texte renvoyé par un outil, comme un message client ou une page web, peut contenir des instructions destinées au modèle. Ne laissez jamais un résultat d'outil déclencher seul une action sensible.
- **Demandez avant toute action destructrice.** Supprimer, payer ou envoyer doit demander la confirmation d'une personne.
- **N'installez que des serveurs de confiance.** Un serveur MCP local tourne avec les permissions de votre utilisateur. Lisez le code ou utilisez des serveurs d'éditeurs connus.

## MCP ou simple tool use ?

Si vos outils ne servent qu'à un seul agent dans votre propre produit, le tool use classique, comme dans le tutoriel sur les agents, est plus simple : pas de processus en plus, pas de protocole. MCP devient rentable quand les mêmes capacités doivent être disponibles pour plusieurs applications IA, pour les outils de votre équipe, ou pour les agents de vos propres clients.

Ce dernier cas mérite réflexion. À mesure que les gens travaillent via des assistants IA, un serveur MCP devient une partie de la surface publique d'un produit, à côté de son site et de son API.

Si vous vous demandez si votre produit devrait en avoir un, [parlons-en](/fr#contact).
