import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { byDateAndAlphabetical } from "./PageList"
import { getDate } from "./Date"
import { FullSlug, resolveRelative } from "../util/path"
import style from "./styles/blogPosts.scss"

interface Options {
  placement: "home" | "language"
}

export default (({ placement }: Options) => {
  const BlogPosts: QuartzComponent = ({ allFiles, cfg, fileData }: QuartzComponentProps) => {
    const slug = fileData.slug
    if (placement === "home" && slug !== "index") return null
    if (placement === "language" && slug !== "nl/index" && slug !== "en/index") return null

    const language = slug === "en/index" ? "en" : "nl"
    const posts = allFiles
      .filter((file) => file.slug?.startsWith(`${language}/posts/`))
      .sort(byDateAndAlphabetical(cfg))
      .slice(0, 5)

    return (
      <section
        class="blog-posts"
        aria-label={language === "nl" ? "Nieuwste posts" : "Latest posts"}
      >
        <h2>{language === "nl" ? "Nieuwste posts" : "Latest posts"}</h2>
        {posts.length === 0 ? (
          <p>{language === "nl" ? "Nog geen posts gepubliceerd." : "No posts published yet."}</p>
        ) : (
          <ol>
            {posts.map((post) => {
              const date = getDate(cfg, post)
              const translation = post.frontmatter?.translation
              const description = post.description?.replace(/^(Het probleem|The problem)\s+/i, "")
              return (
                <li>
                  <article>
                    {date && (
                      <time datetime={date.toISOString()}>
                        {date.toLocaleDateString(language === "nl" ? "nl-NL" : "en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    )}
                    <h3>
                      <a class="internal" href={resolveRelative(slug!, post.slug!)}>
                        {post.frontmatter?.title}
                      </a>
                    </h3>
                    {description && <p>{description}</p>}
                    {typeof translation === "string" && (
                      <a
                        class="blog-translation internal"
                        href={resolveRelative(slug!, translation as FullSlug)}
                      >
                        {language === "nl" ? "Read in English →" : "Lees in het Nederlands →"}
                      </a>
                    )}
                  </article>
                </li>
              )
            })}
          </ol>
        )}
        {posts.length > 0 && (
          <a
            class="blog-all-posts internal"
            href={resolveRelative(slug!, `${language}/posts` as FullSlug)}
          >
            {language === "nl" ? "Alle posts →" : "All posts →"}
          </a>
        )}
      </section>
    )
  }

  BlogPosts.css = style
  return BlogPosts
}) satisfies QuartzComponentConstructor<Options>
