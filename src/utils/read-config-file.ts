import fs from 'fs-extra'
import { createRequire } from 'module'
import pino from 'pino'
import { exit } from 'process'
import { resolveFromWorkingDirectory } from './paths.js'

const require = createRequire(import.meta.url)

const readConfigFile = (configPath: string) => {
  const logger = pino()
  const resolvedPath = resolveFromWorkingDirectory(configPath)

  try {
    return require(resolvedPath)
  } catch {
    try {
      const fileContents = fs.readFileSync(resolvedPath, 'utf-8')
      return JSON.parse(fileContents)
    } catch {
      logger.error(
        '❌ Could not load the config file as a JS module or parse it as JSON. Please check the file content.'
      )
      exit(1)
    }
  }
}

export { readConfigFile }
