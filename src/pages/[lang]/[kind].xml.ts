import type { APIContext } from "astro"
import { feed } from "../../lib/feed"
import { feeds, postsFor, t, typeOf, type Lang } from "../../lib/site"

// One feed per kind of post and language: /nl/mind.xml, /nl/experimenten.xml, /en/mind.xml, /en/experiments.xml
export const getStaticPaths = () =>
  (["nl", "en"] as Lang[]).flatMap((lang) =>
    Object.entries(feeds[lang]).map(([type, kind]) => ({ params: { lang, kind }, props: { type } })),
  )

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang
  const { type } = context.props as { type: string }
  const section = t[lang].sections[type]
  const posts = (await postsFor(lang)).filter((p) => typeOf(p) === type)
  return feed(context, `mindwrapper · ${section.title}`, section.sub, posts)
}
