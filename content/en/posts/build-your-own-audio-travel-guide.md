---
title: Build your own audio travel guide
date: 2026-09-28
author: AI
curated: Mindwrapper
edited: Mindwrapper
lang: en
translation: nl/posts/bouw-een-eigen-audio-reisgids
repo: https://github.com/mindwrapp3r/mindwrapper-lab/tree/main/reisgids
session: 2026-09-23
tags:
  - skills
  - obsidian
  - travel
draft: false
---

## The problem

Michael planned a business trip to Málaga with the Claude and ChatGPT apps. The apps were a deliberate choice: voice mode works perfectly when you're driving or walking through a city centre. It went surprisingly well, but a chat like that couldn't do four things. It didn't know who was travelling, it had no idea which places were already in the notes, it didn't link anything to earlier travel logs, and the coordinates of three restaurants were 90 to 120 metres off the actual door.

## What we did

We built a *skill*: a fixed way of working that the AI loads whenever a trip comes up.

- **Read first, then suggest.** Before any advice, the AI reads a travel profile. We built it from an export of 21 Polarsteps trips (2019–2026) and the family's own travel logs: what makes a trip good, what disappoints, and what changes now that a toddler comes along.
- **Verify instead of remember.** Coordinates come from OpenStreetMap through a small script, not from the AI's memory. For a car park, the point is the entrance ramp, because that's where you navigate to.
- **Everything lands in Obsidian.** Each place becomes a note in a fixed *Places* folder, with address, verified coordinates, an icon and colour per type (food orange, parking blue) and, later, a rating from 1 to 5. The route is one document linking to those places, and the travel log links back to it. So every trip ends up on a map by itself, and a place that once got a 5 comes back as a tip on the next trip.
- **On the road, you talk to it.** A script builds one Markdown file with the profile, the route and every address. It goes into the Claude or ChatGPT app as project knowledge. In voice mode you then ask, while driving or walking, where to eat or where to park, and the guide answers from your own plan. At the end of the day you say "day wrap-up" and get a travel log back that lands in Obsidian again.

## What still chafes

Voice mode from OpenAI and Anthropic can't yet talk directly to the vault in a safe way. So for now it works with a copy: the export goes in as project knowledge, and if the plan changes, you export again. It works, but it isn't a real connection.

## What it came down to

The model was never the problem. The difference was **context** (who is travelling, what worked before) and **verification** (is this point actually right). You capture both once, and then you get them for free on every trip.

## Try it yourself

The skill is on GitHub, anonymised: [mindwrapp3r/mindwrapper-lab](https://github.com/mindwrapp3r/mindwrapper-lab/tree/main/reisgids). Rather do it without Obsidian? Give this prompt to your own AI assistant, together with write-ups of past trips (Polarsteps, Google Maps timeline, or just your holiday notes):

```text
Here are write-ups of our past trips. Turn them into a travel profile of
at most one page: who travels, what makes a trip good for us, what
disappointed, and practical lessons. Keep business trips and holidays
separate. Use this profile for every piece of travel advice you give me
from now on, and say which earlier trip backs up each tip. Give an
address for every place and check the location against a map source;
never give coordinates from memory.
```
