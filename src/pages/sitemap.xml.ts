import type { APIContext } from "astro"
import { getCollection } from "astro:content"
import type { Lang } from "../lib/site"

// Own sitemap instead of @astrojs/sitemap: the NL and EN version of a post have different slugs,
// so the pairs come from the `translation:` field, not from the path
export async function GET({ site }: APIContext) {
  const abs = (path: string) => new URL(path, site).href
  const pair = (nl: string, en: string) => [
    { path: nl, lang: "nl", alt: { nl, en } },
    { path: en, lang: "en", alt: { nl, en } },
  ]
  const urls: { path: string; lang: string; alt?: Record<string, string>; lastmod?: Date }[] = [
    ...pair("/nl/", "/en/"),
    ...pair("/nl/posts/", "/en/posts/"),
  ]
  for (const e of await getCollection("blog", (e) => !e.data.draft)) {
    const lang = e.data.lang as Lang
    const other = lang === "nl" ? "en" : "nl"
    const alt = e.data.translation ? { [lang]: `/${e.id}`, [other]: `/${e.data.translation}` } : undefined
    urls.push({ path: `/${e.id}`, lang, alt, lastmod: e.data.date })
  }
  const body = urls
    .map((u) => {
      const links = Object.entries(u.alt ?? {})
        .map(([l, p]) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(p)}"/>`)
        .join("")
      const lastmod = u.lastmod ? `\n    <lastmod>${u.lastmod.toISOString().slice(0, 10)}</lastmod>` : ""
      return `  <url>\n    <loc>${abs(u.path)}</loc>${lastmod}${links}\n  </url>`
    })
    .join("\n")
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  )
}
