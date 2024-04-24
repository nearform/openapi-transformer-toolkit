import { join as joinDesm } from 'desm'
import { join, resolve } from 'node:path'
import { cwd } from 'node:process'
import _camelCase from 'lodash.camelcase'
import _upperFirst from 'lodash.upperfirst'

const workingDirectory = cwd()
const packageRoot = joinDesm(import.meta.url, '..', '..')

const resolvePath = (basePath: string, ...pathParts: string[]): string =>
  resolve(join(basePath, ...pathParts))

export const resolveFromPackageRoot = (...pathParts: string[]) =>
  resolvePath(packageRoot, ...pathParts)

export const resolveFromWorkingDirectory = (...pathParts: string[]) =>
  resolvePath(workingDirectory, ...pathParts)

export const formatFileName = (title: string): string =>
  _upperFirst(_camelCase(title))
