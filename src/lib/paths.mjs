import { fileURLToPath } from "node:url"

// The posts live in the Obsidian vault; `blog` (blog-publish.sh) copies them
// into content/ without drafts, and that copy is what gets built and deployed.
// Point BLOG_CONTENT_DIR at the vault folder to preview straight from Obsidian.
export const CONTENT_DIR =
  process.env.BLOG_CONTENT_DIR ?? fileURLToPath(new URL("../../content", import.meta.url))
