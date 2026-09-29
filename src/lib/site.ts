import { getCollection, type CollectionEntry } from "astro:content"

export type Lang = "nl" | "en"
export type Entry = CollectionEntry<"blog">

export const t = {
  nl: {
    heroName: "Mindwrapper",
    hero: "korte posts over experimenteren met AI en wat het oplevert.",
    sub: "Dingen waar ik mijn verstand omheen probeer te vouwen: tools bouwen, Obsidian automatiseren en meten wat werkt.",
    subNote: "Geschreven met AI.",
    why: "Meer info hierover",
    latest: "Posts",
    latestSub: "Het probleem, de oplossing en hoe je het zelf kunt proberen",
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
    theme: "Donker of licht",
    search: "Zoeken",
    searchPath: "/nl/zoeken",
  },
  en: {
    heroName: "Mindwrapper",
    hero: "short posts about experimenting with AI and what it gets you.",
    sub: "Things I'm trying to wrap my mind around: building tools, automating Obsidian and measuring what works.",
    subNote: "Written with AI.",
    why: "More about this",
    latest: "Posts",
    latestSub: "The problem, the solution and how to try it yourself",
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
    theme: "Dark or light",
    search: "Search",
    searchPath: "/en/search",
  },
} as const

export const isPost = (e: Entry) => e.id.includes("/posts/")

export async function postsFor(lang: Lang) {
  const all = await getCollection("blog", (e) => !e.data.draft && e.data.lang === lang && isPost(e))
  return all.sort((a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0))
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
