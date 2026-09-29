// @ts-check
import { defineConfig } from "astro/config"
import mermaid from "astro-mermaid"
import { readFileSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"
import remarkWikiLinks from "./src/lib/remark-wikilinks.mjs"
import { CONTENT_DIR } from "./src/lib/paths.mjs"


// Old URLs keep working: every `aliases:` entry becomes a redirect to its post.
function aliasRedirects() {
  const redirects = {}
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
      d.isDirectory() ? walk(join(dir, d.name)) : d.name.endsWith(".md") ? [join(dir, d.name)] : [],
    )
  for (const file of walk(CONTENT_DIR)) {
    const text = readFileSync(file, "utf8")
    const fm = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ""
    if (/^draft:\s*true\s*$/m.test(fm)) continue
    const block = fm.match(/^aliases:\n((?:\s+-\s+.*\n?)+)/m)?.[1] ?? ""
    const target = "/" + relative(CONTENT_DIR, file).replace(/\.md$/, "")
    for (const alias of block.matchAll(/-\s+(.+)/g)) {
      redirects["/" + alias[1].trim().replace(/^["']|["']$/g, "")] = target
    }
  }
  return redirects
}

export default defineConfig({
  site: "https://mindwrapper.net",
  // Same URLs as Quartz: /nl/posts/slug (file) and /nl/ (folder index)
  build: { format: "preserve" },
  trailingSlash: "ignore",
  redirects: aliasRedirects(),
  integrations: [mermaid({ theme: "neutral", autoTheme: true })],
  markdown: {
    remarkPlugins: [remarkWikiLinks],
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" } },
  },
})
