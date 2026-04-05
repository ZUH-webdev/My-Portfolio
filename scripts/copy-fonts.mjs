import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'fonts')
const geistSrc = join(root, 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')
const monoSrc = join(root, 'node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2')

mkdirSync(out, { recursive: true })

if (!existsSync(geistSrc) || !existsSync(monoSrc)) {
  console.warn(
    '[copy-fonts] Skipping: install devDependencies (@fontsource-variable/geist, @fontsource-variable/geist-mono).'
  )
  process.exit(0)
}

copyFileSync(geistSrc, join(out, 'geist-latin.woff2'))
copyFileSync(monoSrc, join(out, 'geist-mono-latin.woff2'))
console.log('[copy-fonts] Wrote public/fonts/geist-latin.woff2, geist-mono-latin.woff2')
