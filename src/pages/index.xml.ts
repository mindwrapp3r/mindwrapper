import type { APIContext } from "astro"
import { feed } from "../lib/feed"
import { postsFor } from "../lib/site"

// Same path as the Quartz feed, so existing subscribers keep receiving posts
export async function GET(context: APIContext) {
  const posts = [...(await postsFor("nl")), ...(await postsFor("en"))].sort(
    (a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0),
  )
  return feed(context, "mindwrapper", "Things I'm wrapping my mind around, mostly while working with AI.", posts)
}
