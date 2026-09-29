import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { FullSlug, resolveRelative } from "../util/path"

// Shows who did what on a post, plus a link to the code. The language toggle
// lives in LanguageSwitch.
// Driven by frontmatter: author, curated (chose the topic), edited, checked,
// translated_by, lang, repo. Explained on nl/over and en/about.

const labels = {
  nl: {
    written: (who: string) => `Geschreven door ${who}`,
    curated: (who: string) => `onderwerp gekozen door ${who}`,
    edited: (who: string) => `geredigeerd door ${who}`,
    checked: (who: string) => `gecheckt door ${who}`,
    translated: (who: string) => `vertaald door ${who}`,
    why: "meer info hierover",
    about: "nl/over",
    repo: "Code op GitHub",
  },
  en: {
    written: (who: string) => `Written by ${who}`,
    curated: (who: string) => `topic chosen by ${who}`,
    edited: (who: string) => `edited by ${who}`,
    checked: (who: string) => `checked by ${who}`,
    translated: (who: string) => `translated by ${who}`,
    why: "more about this",
    about: "en/about",
    repo: "Code on GitHub",
  },
}

export default (() => {
  function Provenance({ fileData, displayClass }: QuartzComponentProps) {
    const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>
    const author = fm.author as string | undefined
    if (!author) return null

    const lang = fm.lang === "en" ? "en" : "nl"
    const t = labels[lang]
    const slug = fileData.slug!
    const isAi = author.toLowerCase() === "ai"
    const field = (key: string) => {
      const value = fm[key]
      return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined
    }
    const repo = field("repo")

    const roles = [
      [t.curated, field("curated")],
      [t.edited, field("edited")],
      [t.checked, field("checked")],
      [t.translated, field("translated_by")],
    ] as const
    const extras = roles.filter(([, who]) => who).map(([label, who]) => label(who!))

    return (
      <div class={classNames(displayClass, "provenance", isAi ? "provenance-ai" : "provenance-human")}>
        <p>
          <strong>{t.written(author)}</strong>
          {extras.map((text) => (
            <> · {text}</>
          ))}{" "}
          <a href={resolveRelative(slug, t.about as FullSlug)}>({t.why})</a>
        </p>
        {repo && (
          <p class="provenance-links">
            <a href={repo}>{t.repo} →</a>
          </p>
        )}
      </div>
    )
  }

  Provenance.css = `
.provenance {
  margin: 0.5rem 0 1.5rem;
  padding: 0.5rem 0.9rem;
  border-left: 3px solid var(--tertiary);
  background: var(--highlight);
  border-radius: 4px;
  font-size: 0.9rem;
}
.provenance-human { border-left-color: var(--secondary); }
.provenance p { margin: 0.2rem 0; }
.provenance-links { display: flex; gap: 1.2rem; flex-wrap: wrap; }
`

  return Provenance
}) satisfies QuartzComponentConstructor
