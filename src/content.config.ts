import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { CONTENT_DIR } from "./lib/paths.mjs"

const who = z.string().trim().min(1).optional().nullable()

const blog = defineCollection({
  loader: glob({ base: CONTENT_DIR, pattern: ["{nl,en}/**/*.md", "!**/index.md"] }),
  schema: z
    .object({
      title: z.string(),
      description: z.string().optional().nullable(),
      type: z.string().optional().nullable(), // kind of post, e.g. "experiment"; shown above the title
      date: z.coerce.date().optional(),
      author: who,
      curated: who,
      edited: who,
      checked: who,
      translated_by: who,
      lang: z.enum(["nl", "en"]),
      translation: z.string().optional().nullable(),
      repo: z.string().url().optional().nullable(),
      session: z.unknown().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      aliases: z.array(z.string()).optional(),
    })
    // The label on the site must be true: either edited or checked, never both
    .refine((p) => !(p.edited && p.checked), "Vul edited óf checked in, niet allebei"),
})

export const collections = { blog }
