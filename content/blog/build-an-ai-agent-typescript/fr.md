---
title: "Créer votre premier agent IA en TypeScript"
description: "Un agent, c'est un modèle, quelques outils et une boucle. On construit un agent de support client avec le SDK Anthropic et une route Next.js, puis on le rend assez sûr pour la production."
date: 2026-10-13
tags: ["Agents IA", "TypeScript", "Next.js", "Claude"]
---

« Agent » est devenu l'un des mots les plus galvaudés de la tech. Sous le marketing, l'idée est simple : un modèle de langage qui peut appeler des fonctions que vous avez écrites, regarder le résultat, et décider de la suite jusqu'à ce que la tâche soit terminée.

Dans ce tutoriel, on construit un petit agent de support pour une boutique en ligne. Il peut vérifier une commande, chercher dans le centre d'aide et ouvrir une demande de remboursement. On utilise TypeScript, le SDK officiel d'Anthropic et une route Next.js.

## Ce qu'est vraiment un agent

Un agent, ce sont trois choses :

- **Un modèle** qui lit la conversation et décide quoi faire.
- **Des outils** : des fonctions de votre code, chacune décrite par un nom, une description et un schéma pour ses entrées.
- **Une boucle** : vous envoyez la conversation, le modèle répond ou demande à appeler un outil, vous exécutez l'outil, renvoyez le résultat, et recommencez.

Le modèle n'exécute jamais votre code. Il renvoie une demande du type « appelle `get_order_status` avec `orderId: "CMD-1042"` », votre programme l'exécute, et c'est vous qui décidez de ce que le modèle a le droit de faire. C'est ce qui permet de construire des agents sûrs.

## Installation

Dans un projet Next.js existant :

```bash
npm install @anthropic-ai/sdk zod
```

Ajoutez votre clé d'API dans `.env.local`. Le SDK la lit automatiquement :

```bash
ANTHROPIC_API_KEY=votre-cle
```

## Étape 1 : décrire un outil

Un outil est un contrat. La description compte autant que le code : c'est ce que le modèle lit pour décider quand l'utiliser.

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

Les descriptions sont en anglais ici, mais le français fonctionne tout aussi bien : écrivez-les dans la langue de votre équipe.

## Étape 2 : écrire la boucle soi-même, une fois

Vous ne garderez pas cette version, mais l'écrire une fois montre exactement ce qui se passe. `db` représente votre propre couche de données.

```ts
const client = new Anthropic(); // lit ANTHROPIC_API_KEY

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
      return "Désolé, je ne peux pas traiter cette demande.";
    }

    if (response.stop_reason !== "tool_use") {
      return response.content
        .filter((block): block is Anthropic.TextBlock => block.type === "text")
        .map((block) => block.text)
        .join("\n");
    }

    // 1. On garde le tour du modèle, avec ses appels d'outils
    messages.push({ role: "assistant", content: response.content });

    // 2. On exécute chaque outil demandé et on renvoie tous les résultats en un seul message
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

Trois détails à retenir :

- **`stop_reason` pilote la boucle.** `tool_use` veut dire « exécute mes outils et reviens » ; toute autre valeur signifie que le tour est terminé.
- **Le modèle peut demander plusieurs outils à la fois.** Exécutez-les tous et renvoyez tous les résultats dans un seul message.
- **Les erreurs sont aussi des résultats.** Quand un outil échoue, renvoyez l'erreur avec `is_error: true`. Le modèle sait souvent rebondir, par exemple en demandant au client de vérifier son numéro de commande.

## Étape 3 : laisser le SDK gérer la boucle

En pratique, le « tool runner » du SDK gère cette boucle pour vous. Les outils sont définis avec Zod, donc leurs entrées sont validées avant que votre code ne s'exécute.

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
    // Si un classifieur de sécurité refuse, on relance sur le modèle recommandé par Anthropic
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system:
      "You are the support assistant of an online shop. Answer in the customer's language. Never promise a refund: open a request instead.",
    tools: [getOrderStatus, searchHelpCenter, requestRefund],
    messages: [{ role: "user", content: question }],
  });

  if (message.stop_reason === "refusal") {
    return "Désolé, je ne peux pas traiter cette demande.";
  }

  return message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}
```

Placez ce code dans `lib/support-agent.ts`. Le tool runner et les fallbacks côté serveur sont des fonctionnalités beta du SDK : fixez la version du SDK et lisez le changelog avant chaque mise à jour.

## Étape 4 : l'exposer avec une route Next.js

L'agent tourne côté serveur, là où vivent votre clé d'API et votre base de données. Une route dans `app/api/support/route.ts` suffit :

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

Votre frontend peut maintenant envoyer une question en `POST` sur `/api/support` et afficher la réponse. Pour une interface de chat, l'étape suivante est de streamer la réponse pour que le texte apparaisse au fur et à mesure.

## Le rendre prêt pour la production

Un agent de démo se fait en un après-midi. Un agent en production demande quelques décisions de plus :

- **Bornez la boucle.** `max_iterations` arrête un agent qui tourne en rond. Choisissez la valeur à partir de vos vraies conversations, pas au hasard.
- **Séparez les outils de lecture des outils d'écriture.** Lire une commande est sans risque. Tout ce qui déplace de l'argent, envoie un e-mail ou supprime des données doit créer une demande qu'une personne valide, comme `request_refund` ci-dessus.
- **Traitez les résultats d'outils comme des données, pas des instructions.** Un article d'aide ou un message client peut contenir du texte qui ressemble à un ordre. Ce sont votre prompt système et votre code qui décident de ce que l'agent peut faire, jamais le contenu qu'il lit.
- **Journalisez chaque étape.** Gardez la question, chaque appel d'outil avec son entrée et son résultat, la réponse finale et la consommation de tokens. C'est comme ça qu'on débogue, et qu'on répond à « pourquoi a-t-il dit ça ? ».
- **Surveillez le coût.** Le cache de prompt rend beaucoup moins cher un prompt système et une liste d'outils longs et stables sur des appels répétés, et un modèle plus léger ou un niveau d'effort plus bas suffit souvent pour des questions de support simples. Mesurez avant de choisir.
- **Construisez un jeu d'évaluation.** Cinquante vraies questions avec le comportement attendu, relancées à chaque changement, attraperont plus de régressions que n'importe quel test manuel.

## Pour aller plus loin

Nos outils vivent à l'intérieur de l'application. Quand vous voulez que les mêmes outils soient disponibles pour plusieurs applications IA, comme votre agent, Claude Desktop ou un IDE, l'étape suivante est de les exposer via le Model Context Protocol. C'est le sujet de [MCP expliqué](/fr/blog/mcp-explained).

Si vous préparez un agent pour votre produit, [parlez-m'en](/fr#contact).
