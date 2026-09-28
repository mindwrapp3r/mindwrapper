import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { FullSlug, resolveRelative } from "../util/path"

// Shows who wrote a post, who reviewed it, and links to code and the other language.
// Driven by frontmatter: author, curated, translated_by, lang, translation, repo.

const labels = {
  nl: {
    ai: "Geschreven door AI",
    curated: (who: string) => `samengesteld en gecontroleerd door ${who}`,
    human: (who: string) => `Geschreven door ${who}`,
    translated: "vertaald door AI",
    why: "waarom?",
    about: "nl/over",
    repo: "Code op GitHub",
    translation: "Read in English",
  },
  en: {
    ai: "Written by AI",
    curated: (who: string) => `curated and reviewed by ${who}`,
    human: (who: string) => `Written by ${who}`,
    translated: "translated by AI",
    why: "why?",
    about: "en/about",
    repo: "Code on GitHub",
    translation: "Lees in het Nederlands",
  },
}

export default (() => {
  function Provenance({ fileData, displayClass }: QuartzComponentProps) {
    const fm = fileData.frontmatter ?? {}
    const author = fm.author as string | undefined
    if (!author) return null

    const lang = fm.lang === "en" ? "en" : "nl"
    const t = labels[lang]
    const slug = fileData.slug!
    const isAi = author.toLowerCase() === "ai"
    const curated = fm.curated as string | undefined
    const repo = fm.repo as string | undefined
    const translation = fm.translation as string | undefined
    const translatedByAi = String(fm.translated_by ?? "").toLowerCase() === "ai"

    return (
      <div class={classNames(displayClass, "provenance", isAi ? "provenance-ai" : "provenance-human")}>
        <p>
          {isAi ? (
            <>
              <strong>{t.ai}</strong>
              {curated && <> · {t.curated(curated)}</>}{" "}
              <a href={resolveRelative(slug, t.about as FullSlug)}>({t.why})</a>
            </>
          ) : (
            <>
              <strong>{t.human(author)}</strong>
              {translatedByAi && (
                <>
                  {" "}
                  · {t.translated} <a href={resolveRelative(slug, t.about as FullSlug)}>({t.why})</a>
                </>
              )}
            </>
          )}
        </p>
        {(repo || translation) && (
          <p class="provenance-links">
            {repo && <a href={repo}>{t.repo} →</a>}
            {translation && (
              <a href={resolveRelative(slug, translation as FullSlug)}>{t.translation} →</a>
            )}
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
