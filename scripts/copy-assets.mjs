// Images in the posts live next to them in <content>/assets; the site serves them from /assets.
import { cpSync, existsSync, rmSync } from "node:fs"
import { CONTENT_DIR } from "../src/lib/paths.mjs"

const from = `${CONTENT_DIR}/assets`
const to = new URL("../public/assets", import.meta.url)
rmSync(to, { recursive: true, force: true })
if (existsSync(from)) cpSync(from, to, { recursive: true })
