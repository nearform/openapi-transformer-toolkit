import { readFile, writeFile } from 'fs/promises'
import { remark } from 'remark'
import remarkToc from 'remark-toc'

const README_PATH = 'README.md'

const readmeContent = await readFile(README_PATH, 'utf8')

const file = await remark().use(remarkToc).process(readmeContent)

await writeFile(README_PATH, String(file))
