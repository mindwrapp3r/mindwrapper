import { getCollection, type CollectionEntry } from "astro:content"

export type Lang = "nl" | "en"
export type Entry = CollectionEntry<"blog">

export const t = {
  nl: {
    heroName: "Mindwrapper",
    hero: "korte posts over werken met AI, en wat het echt oplevert.",
    sub: "Dingen waar ik mijn hoofd omheen probeer te krijgen: tools bouwen, Obsidian automatiseren, en meten wat werkt.",
    subNote: "Geschreven door AI, gekozen en gecontroleerd door Mindwrapper.",
    why: "Waarom zo?",
    latest: "Posts",
    latestSub: "Het probleem, wat we deden, en wat je zelf kunt proberen",
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
  },
  en: {
    heroName: "Mindwrapper",
    hero: "short posts about working with AI, and what it really gets you.",
    sub: "Things I'm wrapping my mind around: building tools, automating Obsidian, and measuring what works.",
    subNote: "Written by AI, chosen and reviewed by Mindwrapper.",
    why: "Why like this?",
    latest: "Posts",
    latestSub: "The problem, what we did, and what you can try yourself",
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
