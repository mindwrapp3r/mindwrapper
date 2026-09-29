---
title: "Prompt profile: let the AI answer at your level"
date: 2026-04-25
author: Mindwrapper
edited: AI
translated_by: AI
lang: en
translation: nl/posts/prompt-profiel-laat-de-ai-op-jouw-niveau-antwoorden
aliases:
  - en/posts/context-over-level
tags:
  - obsidian
  - claudecode
  - prompt
draft: false
---

I asked Claude to review my prompts, based on my past conversations. One tip: state your knowledge level of the topic in your question. That gets you an answer at your level instead of a generic one.

Claude immediately gave examples, with my level per topic. But if Claude already knows that, why should I type it every time?

So I had Claude build a prompt profile from my chats: my level per domain, from Basic to Expert. An excerpt:

| Domain | Level |
|---|---|
| Claude Code | Expert |
| Prompt engineering | Advanced |
| Local LLMs | Basic |

That profile now goes along with every chat automatically.

## What it gets me

- **Time.** I no longer type my level with every question, and because the first answer fits right away, fewer follow-up questions are needed.
- **Better answers.** No explanations of what I already know, and depth where I need it.
- **Lower costs.** The profile adds some input tokens to every chat, but with Claude those are five times cheaper than output tokens. The gain is in the output: no unnecessary explanations and fewer rounds. A little extra input for less output is a good trade.

## Try it yourself

Give this prompt to your own AI assistant and put the result in its standing instructions:

```text
Look at our past conversations and build a profile of my expertise per
domain, with a level of Basic, Intermediate, Advanced or Expert and, for
each domain, one line on what you base that on. Be strict: only a high
level if I talk about it often and in depth. Keep it to one page.
```
