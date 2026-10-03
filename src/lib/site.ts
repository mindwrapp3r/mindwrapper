import { getCollection, type CollectionEntry } from "astro:content"

export type Lang = "nl" | "en"
export type Entry = CollectionEntry<"blog">

export const t = {
  nl: {
    heroName: "Mindwrapper",
    hero: ": elastisch denken, accepteren, sneller leren, meer bouwen.",
    sub: "Mind gaat over hoe ik mijn brein elastisch houd als alles verandert. Daardoor accepteer en leer ik nieuwe dingen sneller, en dat zie je terug in de Experimenten: AI-tools bouwen, Obsidian automatiseren en meten wat werkt.",
    subHtml: "<strong>Mind</strong> gaat over hoe ik mijn brein elastisch houd als alles verandert. Daardoor accepteer en leer ik nieuwe dingen sneller, en dat zie je terug in de <strong>Experimenten</strong>: AI-tools bouwen, Obsidian automatiseren en meten wat werkt.",
    subNote: "Geschreven met AI.",
    why: "Meer info hierover",
    whyAnchor: "wie-schrijft-dit",
    all: "Alle posts",
    readMore: "Lees meer",
    about: "Over",
    aboutPath: "/nl/over",
    provenance: "Herkomst",
    written: "Geschreven door",
    curated: "onderwerp gekozen door",
    edited: "geredigeerd door",
    checked: "gecheckt door",
    translated: "vertaald door",
    code: "Code op GitHub",
    locale: "nl-NL",
    post: "Post",
    types: { experiment: "Experiment", mind: "Mind" } as Record<string, string>,
    sections: {
      mind: { title: "Mind", sub: "Je brein elastisch houden om met verandering om te gaan" },
      experiment: { title: "Experimenten", sub: "Het probleem, de oplossing en hoe je het zelf kunt proberen" },
    } as Record<string, { title: string; sub: string }>,
    series: "Reeks",
    part: (n: number, total: number) => `deel ${n} van ${total}`,
    previous: "Vorig deel",
    next: "Volgend deel",
    theme: "Donker of licht",
    search: "Zoeken",
    searchPath: "/nl/zoeken",
    ogFooter: "Blog over elastisch denken en bouwen met AI",
    filterAll: "Alles",
    filterLabel: "Toon",
    rssAll: "alles",
  },
  en: {
    heroName: "Mindwrapper",
    hero: ": an elastic mind, acceptance, faster learning, more building.",
    sub: "Mind is about keeping my brain elastic when everything changes. That lets me accept and learn new things faster, which shows in the Experiments: building AI tools, automating Obsidian and measuring what works.",
    subHtml: "<strong>Mind</strong> is about keeping my brain elastic when everything changes. That lets me accept and learn new things faster, which shows in the <strong>Experiments</strong>: building AI tools, automating Obsidian and measuring what works.",
    subNote: "Written with AI.",
    why: "More about this",
    whyAnchor: "who-writes-this",
    all: "All posts",
    readMore: "Read more",
    about: "About",
    aboutPath: "/en/about",
    provenance: "Provenance",
    written: "Written by",
    curated: "topic chosen by",
    edited: "edited by",
    checked: "checked by",
    translated: "translated by",
    code: "Code on GitHub",
    locale: "en-GB",
    post: "Post",
    types: { experiment: "Experiment", mind: "Mind" } as Record<string, string>,
    sections: {
      mind: { title: "Mind", sub: "Keeping your mind elastic enough to deal with change" },
      experiment: { title: "Experiments", sub: "The problem, the solution and how to try it yourself" },
    } as Record<string, { title: string; sub: string }>,
    series: "Series",
    part: (n: number, total: number) => `part ${n} of ${total}`,
    previous: "Previous part",
    next: "Next part",
    theme: "Dark or light",
    search: "Search",
    searchPath: "/en/search",
    ogFooter: "A blog about an elastic mind and building with AI",
    filterAll: "All",
    filterLabel: "Show",
    rssAll: "everything",
  },
} as const

// Feed file per kind of post: /<lang>/<name>.xml
export const feeds: Record<Lang, Record<string, string>> = {
  nl: { mind: "mind", experiment: "experimenten" },
  en: { mind: "mind", experiment: "experiments" },
}

export const isPost = (e: Entry) => e.id.includes("/posts/")

export async function postsFor(lang: Lang) {
  const all = await getCollection("blog", (e) => !e.data.draft && e.data.lang === lang && isPost(e))
  return all.sort((a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0))
}

// Posts without a type are AI posts from before the split into Mind and Experiments
export const typeOf = (e: Entry) => e.data.type ?? "experiment"

// All parts of the series this post belongs to, in order, in the same language
export async function seriesOf(entry: Entry) {
  const { series, lang } = entry.data
  if (!series) return []
  const parts = await getCollection("blog", (e) => !e.data.draft && e.data.lang === lang && e.data.series === series)
  return parts.sort((a, b) => (a.data.part ?? 0) - (b.data.part ?? 0))
}

export const formatDate = (d: Date | undefined, lang: Lang) =>
  d?.toLocaleDateString(t[lang].locale, { day: "numeric", month: "long", year: "numeric" }) ?? ""

// First real paragraph of the post, as plain text, for cards and the subtitle
export function excerpt(entry: Entry, max = 180) {
  const para =
    (entry.body ?? "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p && !/^(#|```|!\[|\||-|>)/.test(p)) ?? ""
  const text = para
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, a, b) => b || a)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
  return text.length > max ? text.slice(0, max).replace(/\s+\S*$/, "") + "…" : text
}

// "Geschreven door AI · onderwerp gekozen door Mindwrapper · geredigeerd door …"
export function provenance(entry: Entry, lang: Lang) {
  const d = entry.data
  if (!d.author) return null
  const l = t[lang]
  const roles = [
    [l.curated, d.curated],
    [l.edited, d.edited],
    [l.checked, d.checked],
    [l.translated, d.translated_by],
  ]
    .filter(([, who]) => who)
    .map(([label, who]) => `${label} ${who}`)
  return { written: `${l.written} ${d.author}`, roles }
}
