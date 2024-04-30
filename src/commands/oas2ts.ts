import { Command } from 'commander'
import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import pino, { Logger } from 'pino'
import type { Json2TsOptions } from '../types/Json2TsOptions'
import { readConfigFile } from '../utils/read-config-file.js'
import { runCommand as runJson2TsCommand } from './json2ts.js'
import { runCommand as runOas2JsonCommand } from './oas2json.js'

const TEMP_FOLDER = path.join(os.tmpdir(), 'temp-json-schemas')

const cleanUpTempFolder = (logger: Logger) =>
  fs.remove(TEMP_FOLDER).catch(error => {
    logger.error('❌ Failed to clean up temporary folder:', error.message)
  })

export const runCommand = async (
  openApiPath: string,
  tsTypesPath: string,
  propertiesToExport?: string,
  customOptions?: Json2TsOptions,
  logger: Logger = pino()
) => {
  try {
    const silentLogger = pino({ level: 'silent' })
    // const schemasDir = path.join(TEMP_FOLDER, 'components.schemas')
    const schemasDir = path.join(TEMP_FOLDER, 'paths')
    runOas2JsonCommand(
      openApiPath,
      TEMP_FOLDER,
      propertiesToExport,
      silentLogger
    )

    await runJson2TsCommand(
      // schemasDir,
      TEMP_FOLDER,
      tsTypesPath,
      propertiesToExport,
      customOptions,
      silentLogger
    )

    logger.info('✅ TypeScript types generated successfully from OpenAPI file')
  } catch (error) {
    logger.error(
      '❌ An error occurred during the process:',
      (error as Error).message
    )
  } finally {
    await cleanUpTempFolder(logger)
  }
}

const main = async () => {
  const options = oas2ts.optsWithGlobals()
  const customOptions = options.config ? readConfigFile(options.config) : {}
  runCommand(
    options.input,
    options.output,
    options.properties,
    customOptions,
    options.logger
  )
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
  .option(
    '-p, --properties <string>',
    'Comma-separated list of properties to convert from the OpenAPI file'
  )
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { oas2ts }
