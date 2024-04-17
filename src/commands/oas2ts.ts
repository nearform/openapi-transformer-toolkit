import { Command } from 'commander'
import fs from 'fs-extra'
import pino, { Logger } from 'pino'
import os from 'os'
import path from 'path'
import { runCommand as runJson2TsCommand } from './json2ts.js'
import { runCommand as runOas2JsonCommand } from './oas2json.js'
import { readConfigFile } from '../utils/read-config-file.js'

const TEMP_FOLDER = path.join(os.tmpdir(), 'temp-json-schemas')

const cleanUpTempFolder = (logger: Logger) =>
  fs.remove(TEMP_FOLDER).catch(error => {
    logger.error('❌ Failed to clean up temporary folder:', error.message)
  })

export const runCommand = async (
  openApiPath: string,
  tsTypesPath: string,
  customOptions,
  logger = pino()
) => {
  try {
    const silentLogger = pino({ level: 'silent' })
    const schemasDir = path.join(TEMP_FOLDER, 'components.schemas')
    runOas2JsonCommand(openApiPath, TEMP_FOLDER, undefined, silentLogger)

    await runJson2TsCommand(
      schemasDir,
      tsTypesPath,
      customOptions,
      silentLogger
    )

    logger.info('✅ TypeScript types generated successfully from OpenAPI file')
  } catch (error) {
    logger.error('❌ An error occurred during the process:', error.message)
  } finally {
    await cleanUpTempFolder(logger)
  }
}

const main = async () => {
  const options = oas2ts.optsWithGlobals()
  const customOptions = options.config ? readConfigFile(options.config) : {}
  runCommand(options.input, options.output, customOptions, options.logger)
}

const oas2ts = new Command('oas2ts')

const description = `This command will generate TypeScript types from an OpenAPI file.

Examples:
  $ openapi-transformer-toolkit oas2ts -i ./openapi.yml -o ./types
  $ openapi-transformer-toolkit oas2ts -i ./openapi.yml -o ./types -c ./config.json
`

oas2ts
  .summary('Create TypeScript types from an OpenAPI file')
  .description(description)
  .requiredOption('-i, --input <string>', 'Path to the OpenAPI file')
  .requiredOption(
    '-o, --output <string>',
    'Path to the folder where to output the TypeScript types'
  )
  .option(
    '-c, --config <string>',
    'Path to the JSON/JS config file with these possible options: https://www.npmjs.com/package/json-schema-to-typescript'
  )
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { oas2ts }
