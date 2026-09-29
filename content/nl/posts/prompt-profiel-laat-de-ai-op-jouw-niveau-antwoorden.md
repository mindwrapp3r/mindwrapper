---
title: "Prompt Profiel: laat de AI op jouw niveau antwoorden"
date: 2026-04-25
author: Mindwrapper
edited: AI
lang: nl
translation: en/posts/prompt-profile-let-the-ai-answer-at-your-level
aliases:
  - posts/Context-over-niveau
  - nl/posts/context-over-niveau
tags:
  - obsidian
  - claudecode
  - prompt
draft: false
---

Ik vroeg Claude om op basis van mijn gesprekken feedback te geven op mijn prompts. Eén tip: noem bij je vraag je kennisniveau van het onderwerp. Dan krijg je een antwoord op jouw niveau in plaats van een generiek antwoord.

Claude gaf er meteen voorbeelden bij, met mijn niveau per onderwerp. Maar als Claude dat al weet, waarom zou ik het dan elke keer zelf typen?

Dus liet ik Claude uit mijn chats een prompt profiel maken: per domein mijn niveau, van Basis tot Expert. Een fragment:

| Domein | Niveau |
|---|---|
| Claude Code | Expert |
| Prompt engineering | Gevorderd |
| Lokale LLM's | Basis |

Dat profiel gaat nu automatisch mee met elke chat.

## Wat het oplevert

- **Tijd.** Ik hoef mijn niveau niet meer bij elke vraag te typen, en omdat het eerste antwoord meteen past, zijn er minder vervolgvragen nodig.
- **Betere antwoorden.** Geen uitleg van wat ik al weet, wel diepgang waar ik die nodig heb.
- **Minder kosten.** Het profiel kost bij elke chat wat input tokens, maar die zijn bij Claude vijf keer goedkoper dan output tokens. De winst zit in de output: geen overbodige uitleg en minder rondes. Een beetje extra input voor minder output is een goede ruil.

## Zelf proberen

Geef deze prompt aan je eigen AI-assistent en zet het resultaat in de vaste instructies:

```text
Kijk naar onze eerdere gesprekken en maak een profiel van mijn expertise
per domein, met als niveau Basis, Gemiddeld, Gevorderd of Expert en per
domein één regel waarop je dat baseert. Wees streng: alleen een hoog
niveau als ik er vaak en diepgaand over praat. Houd het op één pagina.
```
