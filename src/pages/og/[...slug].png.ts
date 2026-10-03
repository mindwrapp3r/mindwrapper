import type { APIContext } from "astro"
import { getCollection } from "astro:content"
import { ogImage } from "../../lib/og"
import { formatDate, isPost, t, typeOf, type Entry, type Lang } from "../../lib/site"

// One share image per post, plus one per language for the other pages: /og/nl.png, /og/nl/posts/<slug>.png
export async function getStaticPaths() {
  const posts = await getCollection("blog", (e) => !e.data.draft && isPost(e))
  return [
    ...(["nl", "en"] as Lang[]).map((lang) => ({ params: { slug: lang }, props: { lang } })),
    ...posts.map((entry) => ({ params: { slug: entry.id }, props: { entry, lang: entry.data.lang } })),
  ]
}

export async function GET({ props }: APIContext) {
  const { entry, lang } = props as { entry?: Entry; lang: Lang }
  const l = t[lang]
  const card = entry
    ? {
        title: entry.data.title,
        kicker: [l.types[typeOf(entry)], ...entry.data.tags.slice(0, 2)].join(" · "),
        footer: formatDate(entry.data.date, lang),
      }
    : { title: l.hero.replace(/^:\s*/, "").replace(/^./, (c) => c.toUpperCase()), kicker: "Blog", footer: l.ogFooter }
  return new Response(new Uint8Array(await ogImage(card)), { headers: { "Content-Type": "image/png" } })
}
