import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const getDirname = () => dirname(fileURLToPath(import.meta.url))

export const packageRoot = resolve(join(getDirname(), '..', '..'))

export const resolveFromPackageRoot = (...pathParts) => {
  try {
    return resolve(join(packageRoot, ...pathParts))
  } catch {
    return
  }
}
