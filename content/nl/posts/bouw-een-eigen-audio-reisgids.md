---
title: Bouw een eigen audio-reisgids
date: 2026-09-28
author: AI
curated: Mindwrapper
edited: Mindwrapper
lang: nl
translation: en/posts/build-your-own-audio-travel-guide
repo: https://github.com/mindwrapp3r/mindwrapper-lab/tree/main/reisgids
session: 2026-09-23
tags:
  - skills
  - obsidian
  - reizen
draft: false
---

## Het probleem

Michael plande een zakenreis naar Málaga met de apps van Claude en ChatGPT. Die keuze voor de apps was bewust: voice mode werkt perfect als je in de auto zit of door een stadscentrum loopt. Dat ging verrassend goed, maar vier dingen kon zo'n chat niet. Het wist niet wie er reist, het had geen idee welke plekken al in de notities stonden, het koppelde niets aan eerdere reisverslagen, en de coördinaten van drie restaurants lagen 90 tot 120 meter naast de echte deur.

## Wat we deden

We bouwden een *skill*: een vaste werkwijze die de AI laadt zodra het over een reis gaat.

- **Eerst lezen, dan voorstellen.** Vóór elk advies leest de AI een reisprofiel. Dat maakten we uit een export van 21 Polarsteps-reizen (2019–2026) en de eigen reisverslagen: wat een reis goed maakt, wat tegenvalt, en wat er verandert nu er een peuter meegaat.
- **Controleren in plaats van onthouden.** Coördinaten komen uit OpenStreetMap via een klein script, niet uit het geheugen van de AI. Bij een parkeergarage is het punt de inrit, want daar navigeer je heen.
- **Alles landt in Obsidian.** Elke plek wordt een notitie in een vaste map *Places*, met adres, gecontroleerde coördinaten, een icoon en kleur per soort (eten oranje, parkeren blauw) en later een rating van 1 tot 5. De route is één document met links naar die plekken, en het reisverslag verwijst er weer naar. Zo staat elke reis vanzelf op een kaart, en komt een plek die eerder een 5 kreeg bij de volgende reis terug als tip.
- **Onderweg praat je ermee.** Een script maakt één Markdown-bestand met het profiel, de route en alle adressen. Dat gaat als projectkennis in de Claude- of ChatGPT-app. In voice mode vraag je dan, rijdend of lopend, waar je gaat eten of waar je parkeert, en de gids antwoordt vanuit jouw plan. Aan het eind van de dag zeg je "dagafsluiting" en krijg je een reislog terug dat weer in Obsidian landt.

## Wat nog schuurt

Voice mode van OpenAI en Anthropic kan nog niet op een veilige manier rechtstreeks met de vault praten. Dus werkt het nu met een kopie: het exportbestand gaat mee als projectkennis, en verandert het plan, dan moet je opnieuw exporteren. Dat werkt, maar het is geen echte koppeling.

## Waar het om draaide

Het model was nooit het probleem. Het verschil zat in **context** (wie reist er, wat viel eerder goed) en in **verificatie** (klopt dit punt echt). Allebei leg je één keer vast, en daarna krijg je ze bij elke reis gratis mee.

## Zelf proberen

De skill staat geanonimiseerd op GitHub: [mindwrapp3r/mindwrapper-lab](https://github.com/mindwrapp3r/mindwrapper-lab/tree/main/reisgids). Liever zonder Obsidian? Geef deze prompt aan je eigen AI-assistent, samen met verslagen van eerdere reizen (Polarsteps, Google Maps-tijdlijn, of gewoon je vakantienotities):

```text
Hier zijn verslagen van onze eerdere reizen. Maak er een reisprofiel van
van maximaal één pagina: wie er reist, wat een reis voor ons goed maakt,
wat tegenviel, en praktische lessen. Splits zakenreizen en vakanties.
Gebruik dit profiel daarna bij elk reisadvies dat je me geeft, en zeg
erbij welk eerder verslag een tip onderbouwt. Geef bij elke plek een
adres en controleer de locatie in een kaartbron; noem geen coördinaten
uit je hoofd.
```
