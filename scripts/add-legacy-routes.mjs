import { cp, mkdir, readdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'

const output = fileURLToPath(new URL('../docs/.vitepress/dist/docs/', import.meta.url))

async function addAliases(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      await addAliases(path)
    } else if (entry.isFile() && entry.name.endsWith('.html') &&
      entry.name !== 'index.html' && entry.name !== '404.html') {
      const alias = join(directory, parse(entry.name).name, 'index.html')
      await mkdir(join(directory, parse(entry.name).name), { recursive: true })
      await cp(path, alias)
    }
  }
}

await addAliases(output)
