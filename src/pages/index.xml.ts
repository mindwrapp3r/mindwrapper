import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { excerpt, postsFor } from "../lib/site"

// Same path as the Quartz feed, so existing subscribers keep receiving posts
export async function GET(context: APIContext) {
  const posts = [...(await postsFor("nl")), ...(await postsFor("en"))].sort(
    (a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0),
  )
  return rss({
    title: "mindwrapper",
    description: "Things I'm wrapping my mind around, mostly while working with AI.",
    site: context.site!,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: excerpt(post, 300),
      link: `/${post.id}`,
    })),
  })
}
