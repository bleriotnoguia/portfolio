---
title: "Adding AI to an existing product: a practical playbook"
description: "Most AI projects stall because they start from the model instead of the workflow. A step-by-step method to pick, build and measure a first AI feature that saves real time."
date: 2026-10-06
tags: ["AI", "Product", "LLM"]
---

Every product team now hears the same question: "What are we doing with AI?" The tempting answer is to add a chatbot in the corner of the screen. It's rarely the feature that pays off.

The features that work start from a workflow your users already do, by hand, every week. This article is the method I'd follow to go from that question to a feature in production.

## Start from a workflow, not from a model

List the tasks in your product, or around it, that are repetitive and text-heavy. A few examples that come up in most businesses:

- Sorting incoming support emails and routing them to the right person.
- Pulling the same ten fields out of invoices, contracts or forms.
- Writing a first draft of a report from data you already have.
- Finding the answer to a question buried in internal documentation.

Then score each one on four questions:

1. **Is it frequent?** A task done 200 times a week beats one done twice a year.
2. **Is it slow?** Count the minutes a person spends on it today.
3. **Can a person review the result?** A draft that someone checks is much safer than an action nobody sees.
4. **Do you have examples?** Past emails, filled forms, written reports. You'll need them to measure quality.

The best first candidate is frequent, slow, easy to review and well documented. It's usually less glamorous than a chatbot, and far more useful.

## Pick the smallest feature that saves real time

Most useful AI features fall into a handful of patterns. Naming the pattern helps you scope the work:

| Pattern | What the model does | Example |
| --- | --- | --- |
| Classification | Picks a label from a fixed list | Route a ticket to billing, delivery or technical |
| Extraction | Fills structured fields from free text | Read an invoice into amount, date and supplier |
| Summarisation | Shortens without losing what matters | One paragraph per customer call |
| Drafting | Writes a first version for a person to edit | A reply to a support email |
| Question answering | Answers from your own documents | "What's our refund policy in Senegal?" |
| Agent | Decides which tools to call, in which order | Check an order, then open a refund request |

Start at the top of the table. Classification and extraction are easy to measure and rarely embarrassing. Agents are powerful, but they're the last step, not the first.

## Give the model the right context

A model only knows what's in its training data and what you put in the request. Your product's value is in the second part: your data, your rules, your tone.

For a few dozen documents, the simplest option is often to include them directly in the request. Current models accept very long inputs, and prompt caching makes repeated context much cheaper.

When your knowledge base is larger, use **retrieval** (often called RAG): you first search your documents for the passages relevant to the question, then send only those passages to the model. A Postgres database with the `pgvector` extension is enough for most products; you don't need a new infrastructure to start.

Either way, write down the rules the model must follow, like you would brief a new colleague: who the users are, what it must never do, what to answer when it doesn't know.

## Single call, workflow or agent?

There are three levels of complexity, and you should use the lowest one that does the job:

- **A single call**: one input, one output. Classification, extraction and summaries live here.
- **A workflow**: several steps that your code chains in a fixed order. For example, extract the fields, check them against your database, then draft a reply.
- **An agent**: the model decides which tools to call and when to stop. Use it only when the path can't be written in advance, because it costs more, is slower and is harder to test.

If you can draw the flowchart, it's a workflow. Build that.

## Measure before you ship

This is the step most teams skip, and the reason many AI features quietly get switched off a month later.

Collect 30 to 100 real examples with the answer you expect. Run your feature on all of them and score the results. Some checks can be automatic (did it pick the right label? are the extracted amounts correct?). For open-ended text, a short rubric and a person's review go a long way.

Keep this set. Every time you change the prompt, the model or the context, run it again. It turns "it seems better" into a number.

## Cost, latency and privacy

Three questions your client or your legal team will ask, so answer them early:

- **Cost**: you pay per token, in and out. Estimate it on your real examples, multiply by your monthly volume, and check that the time saved is worth more. Caching repeated context and using a lighter model or a lower effort setting for simple tasks can divide the bill.
- **Latency**: stream the answer so users see text appear immediately, and keep long tasks in the background.
- **Privacy**: know which data leaves your servers, check your provider's retention and training policies, sign a data processing agreement, and strip personal data you don't need. For customers in Europe, this is a GDPR question, not an option.

## Keep a person in the loop where mistakes are expensive

Let the model prepare, and let a person decide, whenever an action is hard to undo. Draft the email, don't send it. Open the refund request, don't pay it. As you collect evidence that the feature is reliable, you can automate more. Going the other way is much harder.

## A two-week plan for a first feature

1. **Days 1 and 2**: pick the workflow with the scoring above and collect 50 real examples.
2. **Days 3 to 5**: write the prompt and the context, and build the evaluation set. Iterate until the scores are good enough to show users.
3. **Days 6 to 8**: integrate the feature behind a feature flag, with logging of inputs, outputs and costs.
4. **Days 9 and 10**: test it with a few internal users and collect their corrections.
5. **After that**: open it to a first group of customers, watch the numbers, and add the corrections to your evaluation set.

Two weeks won't give you a perfect feature. It will give you a real one, with numbers to decide whether to go further.

If you'd like help choosing or building that first feature, [tell me about your product](/en#contact).
