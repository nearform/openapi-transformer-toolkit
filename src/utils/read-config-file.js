import pino from 'pino'
import { resolveFromWorkingDirectory } from './paths.js'
import fs from 'fs-extra'
import { exit } from 'process'

const readConfigFile = configPath => {
  const logger = pino()
  const resolvedPath = resolveFromWorkingDirectory(configPath)

  try {
    return require(resolvedPath)
  } catch (error) {
    try {
      const fileContents = fs.readFileSync(resolvedPath, 'utf-8')
      return JSON.parse(fileContents)
    } catch (jsonError) {
      logger.error(
        '❌ Could not load the config file as a JS module or parse it as JSON. Please check the file content.'
      )
      exit(1)
    }
  }
}

export { readConfigFile }
