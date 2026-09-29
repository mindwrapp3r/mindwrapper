import { JSX } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"

// NL/EN toggle in the top right. Links to the translation of this page when the
// frontmatter names one, otherwise to the matching page of the other language.
// Flags are inline SVG because Windows does not render flag emoji.

type Lang = "nl" | "en"

const flags: Record<Lang, JSX.Element> = {
  nl: (
    <svg viewBox="0 0 9 6" aria-hidden="true">
      <rect width="9" height="6" fill="#21468B" />
      <rect width="9" height="4" fill="#fff" />
      <rect width="9" height="2" fill="#AE1C28" />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id="lang-uk-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#lang-uk-t)" stroke="#C8102E" stroke-width="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
    </svg>
  ),
}

const names: Record<Lang, string> = { nl: "Nederlands", en: "English" }

function targetFor(slug: string, lang: Lang, current: Lang | undefined, translation?: string) {
  if (lang === current) return slug
  if (current && translation) return translation
  if (slug.startsWith(`${current}/posts/`) && slug.endsWith("index")) return `${lang}/posts`
  return `${lang}/index`
}

export default (() => {
  const LanguageSwitch: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const slug = fileData.slug!
    const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>
    const prefix = slug.split("/")[0]
    const current: Lang | undefined =
      fm.lang === "nl" || fm.lang === "en"
        ? fm.lang
        : prefix === "nl" || prefix === "en"
          ? prefix
          : undefined
    const translation = typeof fm.translation === "string" ? fm.translation.trim() : undefined

    return (
      <nav class="language-switch" aria-label="Taal / Language">
        {(["nl", "en"] as Lang[]).map((lang) => (
          <a
            class={lang === current ? "active" : ""}
            href={resolveRelative(slug as FullSlug, targetFor(slug, lang, current, translation) as FullSlug)}
            hreflang={lang}
            title={names[lang]}
            aria-current={lang === current ? "page" : undefined}
          >
            {flags[lang]}
            {lang.toUpperCase()}
          </a>
        ))}
      </nav>
    )
  }

  LanguageSwitch.css = `
.page-header header:has(.language-switch) {
  margin: 1.5rem 0 0;
  justify-content: flex-end;
}
.language-switch {
  display: inline-flex;
  border: 1px solid var(--lightgray);
  border-radius: 999px;
  overflow: hidden;
  font-size: 0.85rem;
}
.language-switch a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  color: var(--darkgray);
  background: transparent;
  font-weight: 600;
  text-decoration: none;
}
.language-switch a + a {
  border-left: 1px solid var(--lightgray);
}
.language-switch a:hover {
  background: var(--highlight);
}
.language-switch a.active {
  background: var(--highlight);
  color: var(--secondary);
}
.language-switch svg {
  width: 1.1rem;
  height: 0.75rem;
  border-radius: 2px;
}
`

  return LanguageSwitch
}) satisfies QuartzComponentConstructor
