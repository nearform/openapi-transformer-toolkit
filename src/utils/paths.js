import { cwd } from 'node:process'
import { join as joinDesm } from 'desm'
import { resolve, join } from 'node:path'

const workingDirectory = cwd()
const packageRoot = joinDesm(import.meta.url, '..', '..')

const resolvePath = (basePath, ...pathParts) => {
  try {
    return resolve(join(basePath, ...pathParts))
  } catch {
    return
  }
}

export const resolveFromPackageRoot = (...pathParts) => {
  return resolvePath(packageRoot, ...pathParts)
}

export const resolveFromWorkingDirectory = (...pathParts) => {
  return resolvePath(workingDirectory, ...pathParts)
}
