// Turns Obsidian wikilinks into normal links, so posts can stay Obsidian-native.
// [[nl/over|Meer info]] -> /nl/over, [[image.png|text]] -> /assets/image.png,
// ![[image.png]] -> the image itself

const WIKILINK = /(!?)\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
const ASSET = /\.(png|jpe?g|gif|svg|webp|pdf)$/i

function href(target) {
  const clean = target.trim().replace(/\.md$/, "")
  if (ASSET.test(clean)) return "/assets/" + clean.split("/").pop()
  return "/" + clean.replace(/(^|\/)index$/, "$1")
}

function splitText(value) {
  const nodes = []
  let last = 0
  for (const m of value.matchAll(WIKILINK)) {
    if (m.index > last) nodes.push({ type: "text", value: value.slice(last, m.index) })
    const [, bang, target, label] = m
    const url = href(target)
    nodes.push(
      bang && ASSET.test(url)
        ? { type: "image", url, alt: (label ?? "").trim() }
        : { type: "link", url, children: [{ type: "text", value: (label ?? target).trim() }] },
    )
    last = m.index + m[0].length
  }
  if (last < value.length) nodes.push({ type: "text", value: value.slice(last) })
  return nodes
}

function visit(node) {
  if (!Array.isArray(node.children)) return
  // Unresolved [[...]] can arrive as several adjacent text nodes; merge them first
  const merged = []
  for (const child of node.children) {
    const prev = merged.at(-1)
    if (child.type === "text" && prev?.type === "text") prev.value += child.value
    else merged.push(child)
  }
  node.children = merged.flatMap((child) =>
    child.type === "text" && child.value.includes("[[") ? splitText(child.value) : [child],
  )
  node.children.forEach(visit)
}

export default function remarkWikiLinks() {
  return (tree) => visit(tree)
}
