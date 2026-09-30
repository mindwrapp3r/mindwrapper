---
title: "Your AI conversations as memory and context"
description: "Every conversation with an AI tool lands as a note in Obsidian, searchable by topic, skill and tool, and a profile learns from them every quarter."
type: experiment
date: 2026-09-30
author: AI
curated: Mindwrapper
edited: Mindwrapper
lang: en
translation: nl/posts/je-ai-gesprekken-als-geheugen-en-context
repo: 
session: 2026-08-22
tags:
  - obsidian
  - bases
  - prompt
draft: false
---

## The problem

Michael works with many AI tools at once: Claude Code, DeepSeek Harness, OpenCode, Codex, Hermes (a personal assistant), and Gemini and Claude in the browser. Each keeps its conversations in its own place, in its own format. Something worked out a month ago is hard to find again.

## The solution

Every conversation becomes a Markdown note in Obsidian, with the same frontmatter: date, source, model, tokens and `categories: [[AI-Chat]]`. On top of that, two fields that make searching easy: **links to the skills** used in the conversation, and the **topics** discussed, each in its own column.

- **Coding tools:** a script exports the sessions three times a day and has a small model write the summary and topics.
- **Browser conversations:** the Obsidian Web Clipper, Obsidian's browser extension, cuts the conversation out of the page and fills in title and summary with an AI prompt.
- **One overview:** an Obsidian Base, a table view across notes, shows everything tagged `AI-Chat`. You search and filter by title, topic, skill or tool.
- **A monthly overview:** every night a script counts, per month and per tool, how many sessions there were and how many tokens they used, and puts that in a single note.

```mermaid
flowchart TD
  A["Claude Code · DeepSeek Harness<br/>OpenCode · Codex · Hermes"] -->|"export 3x a day"| V["Obsidian<br/>one format per conversation"]
  B["Gemini · Claude in the browser"] -->|"Web Clipper"| V
  V --> C["AI-Chat Base<br/>search by topic, skill and tool"]
  V -->|"every night"| M["Monthly overview<br/>sessions and tokens per tool"]
  V -->|"every quarter"| P["Prompt profile"]
  P -->|"goes along with every chat"| A
```

## What it gets you

On 30 September there are **1,421 conversations** in one Base. That gives context that would otherwise be scattered: which skill helped with which topic, and what has been tried before. The monthly overview shows **which tools are used most** and **how many tokens** they cost. In September DeepSeek Harness had the most sessions (196), and Claude Code by far the most tokens.

```mermaid
%%{init: {"themeVariables": {"xyChart": {"plotColorPalette": "#b4532a", "backgroundColor": "transparent"}}}}%%
xychart-beta
  title "Tokens per month in 2026, all tools combined (millions)"
  x-axis ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
  y-axis "Tokens (mln)" 0 --> 4000
  bar [70, 660, 695, 503, 102, 477, 1372, 3509, 3654]
```

*Tokens as the exporters record them, including cached context: a measure of use, not a bill.*


And the conversations keep the [[en/posts/prompt-profile-let-the-ai-answer-at-your-level|prompt profile]] up to date. Every quarter a script looks at the conversations of the past months: where Michael talks about something often and in depth, and learns from it, the level goes up. That way the profile adapts without Michael having to maintain it.

The lesson: one agreed format is worth more than the smartest search.

## What doesn't work yet

- **Clipping is manual work.** Only 61 of the 1,421 conversations came in through the browser, so the profile leans heavily on the coding tools. And only 22 of those 61 have topics; the rest you find by title only.

## Try it yourself

Give this prompt to your own AI assistant:

```text
I use Obsidian and want all my AI conversations in one place. Write a
script that exports the conversations from [my AI tool] to Markdown, with
frontmatter: date, source, model, tokens, topics and categories:
"[[AI-Chat]]". Then create an Obsidian Base that shows every note in that
category, with one view per source. Also write a script that adds up the
number of conversations and tokens per month and per source in a note.
Finally, suggest a Web Clipper template for browser conversations, using
the same format.
```
