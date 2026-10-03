// Share images (og:image): 1200×630 PNG per post, rendered at build time with satori + resvg
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"

// Paths from the project root: after bundling, import.meta.url points into dist/
const require = createRequire(join(process.cwd(), "package.json"))
const font = (pkg: string, file: string) => readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`))

const fonts = [
  { name: "Newsreader", data: font("newsreader", "newsreader-latin-700-normal.woff"), weight: 700, style: "normal" },
  { name: "Newsreader", data: font("newsreader", "newsreader-latin-600-normal.woff"), weight: 600, style: "normal" },
  { name: "Newsreader", data: font("newsreader", "newsreader-latin-500-italic.woff"), weight: 500, style: "italic" },
  { name: "Lato", data: font("lato", "lato-latin-400-normal.woff"), weight: 400, style: "normal" },
  { name: "Lato", data: font("lato", "lato-latin-700-normal.woff"), weight: 700, style: "normal" },
] as const

const INK = "#2f2e2b"
const ACCENT = "#b4532a"
const PAPER = "#f6f4ee"
const SOFT = "#5d5a55"
const RULE = "#e2dfd7"

// The MW mark from the touch icon, without its background and cropped to the mark itself
const mark =
  "data:image/svg+xml;base64," +
  Buffer.from(
    readFileSync(join(process.cwd(), "scripts/apple-touch-icon.svg"), "utf8")
      .replace(/<rect[^>]*\/>/, "")
      .replace(/viewBox="[^"]*"/, 'viewBox="6 11 144 92"'),
  ).toString("base64")

// satori takes a React-like tree; plain objects keep this file free of JSX
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } })

export interface Card {
  title: string
  kicker: string
  footer: string
}

export async function ogImage({ title, kicker, footer }: Card) {
  const size = title.length <= 40 ? 78 : title.length <= 70 ? 64 : 54
  const tree = h(
    "div",
    { width: 1200, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px", background: PAPER, color: INK },
    [
      h("div", { display: "flex", alignItems: "center", gap: 18 }, [
        { type: "img", props: { src: mark, width: 125, height: 80 } },
        h("div", { display: "flex", fontFamily: "Newsreader", fontSize: 44, fontWeight: 600 }, [
          h("span", {}, "mind"),
          h("span", { color: ACCENT, fontStyle: "italic", fontWeight: 500 }, "wrapper"),
        ]),
      ]),
      h("div", { display: "flex", flexDirection: "column", gap: 22 }, [
        h("div", { fontFamily: "Lato", fontWeight: 700, fontSize: 26, letterSpacing: 3, color: ACCENT, textTransform: "uppercase" }, kicker),
        h("div", { fontFamily: "Newsreader", fontWeight: 700, fontSize: size, lineHeight: 1.08, letterSpacing: -1 }, title),
      ]),
      h("div", { display: "flex", justifyContent: "space-between", paddingTop: 22, borderTop: `2px solid ${RULE}`, fontFamily: "Lato", fontSize: 26, color: SOFT }, [
        h("span", {}, footer),
        h("span", {}, "mindwrapper.net"),
      ]),
    ],
  )
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: fonts as never })
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng()
}
