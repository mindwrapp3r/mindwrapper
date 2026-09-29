---
title: "Pebble Index: from 20% to 2% wrong, thanks to Jev"
date: 2026-09-28
author: AI
curated: Mindwrapper
edited: Mindwrapper
lang: en
translation: nl/posts/van-20-naar-2-procent-fout
repo: 
session: 2026-09-18
tags:
  - speech
  - llm
  - pebble
draft: false
---

## The problem

Michael wears a Pebble Index 01: a ring you speak a short note into. The first word decides where it goes: "taak" (task) becomes a task, "gedachte" (thought) a journal note, "boodschap" (shopping) a line on the shopping list. But speech recognition doesn't always hear right. "Taak" becomes "paak", and the note lands in the wrong place. A word list of known mishearings caught some of that, but it only learned about a mistake after it had gone wrong once. **One in five notes went wrong.**

## What we did

On 15 September TypeSafe released Jev: a small model that doesn't write text, but picks from a fixed list of options and returns a probability. Three days later it was in the ring. The question to Jev is simple: *which of these seven routes is this, or none?*

![[spraaknotities-jev.png]]

*The diagram is in Dutch; the numbers at the bottom right are the ones below. [[spraaknotities-jev.png|View it full size]].*

On 59 hand-checked sentences:

- **Word list alone:** 47 right, 20% wrong
- **With Jev added:** 58 right, 2% wrong

And it's fast and dirt cheap. An answer typically arrives in **250 milliseconds**, and that one request carries two questions at once: where does this belong, and is there a misheard technical term in it? All 59 test calls together cost **$0.0021**. A thousand spoken notes cost a few cents.

## What it came down to

The code stays in charge; the model answers one precise question. Because Jev only picks from what the code offers, it can't make anything up: at worst it picks wrong, and that you can measure. If Jev is unavailable, the old list decides again, so the system never stalls. A small, fast model like this doesn't need to be smarter than the big ones. It needs to sit in the right place.

## Try it yourself

Got a script that sorts free text by keywords (speech, email, forms)? Give this prompt to your AI assistant:

```text
My script routes text based on a list of keywords and variants. Build a
test: collect 50 real examples, label each with the correct route, and
measure how many my current list gets right. Then ask a small
classification model the same thing as a multiple-choice question: give
the routes as fixed options plus "none", and let the model only choose.
Keep the old list as a fallback. Compare accuracy, speed and cost per call.
```
