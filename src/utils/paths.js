import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { cwd } from 'node:process'

const getDirname = () => dirname(fileURLToPath(import.meta.url))

export const workingDirectory = cwd()

export const packageRoot = resolve(join(getDirname(), '..', '..'))

export const resolveFromPackageRoot = (...pathParts) => {
  try {
    return resolve(join(packageRoot, ...pathParts))
  } catch {
    return
  }
}

export const resolveFromWorkingDirectory = (...pathParts) => {
  try {
    return resolve(join(workingDirectory, ...pathParts))
  } catch {
    return
  }
}
