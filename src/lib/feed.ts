import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { excerpt, type Entry } from "./site"

export function feed(context: APIContext, title: string, description: string, posts: Entry[]) {
  return rss({
    title,
    description,
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
