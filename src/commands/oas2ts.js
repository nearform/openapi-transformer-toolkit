import { Command } from 'commander'
import fs from 'fs-extra'
import { runCommand as runJson2TsCommand } from './json2ts.js'
import { runCommand as runOas2JsonCommand } from './oas2json.js'
import os from 'os'
import path from 'path'

const TEMP_FOLDER = path.join(os.tmpdir(), 'temp-json-schemas')

const cleanUpTempFolder = () => {
  fs.remove(TEMP_FOLDER).catch(error => {
    console.error('❌ Failed to clean up temporary folder:', error.message)
  })
}

export const runCommand = async (
  openApiPath,
  tsTypesPath,
  configPath,
  muteConsoleLog
) => {
  try {
    const muteConsoleLogInIntermediateSteps = true

    runOas2JsonCommand(
      openApiPath,
      TEMP_FOLDER,
      muteConsoleLogInIntermediateSteps
    )

    await runJson2TsCommand(
      TEMP_FOLDER,
      tsTypesPath,
      configPath ? { config: configPath } : {},
      muteConsoleLogInIntermediateSteps
    )

    if (!muteConsoleLog) {
      console.log(
        '✅ TypeScript types generated successfully from OpenAPI file'
      )
    }
  } catch (error) {
    console.error('❌ An error occurred during the process:', error.message)
  } finally {
    cleanUpTempFolder()
  }
}

const main = async () => {
  const options = oas2ts.optsWithGlobals()

  runCommand(
    options.input,
    options.output,
    options.config,
    options.muteConsoleLog
  )
}

const oas2ts = new Command('oas2ts')

const description = `This command will generate TypeScript types from an OpenAPI file.

Examples:
  $ openapi-transformer-toolkit oas2ts -i ./openapi.yml -o ./types
  $ openapi-transformer-toolkit oas2ts -i ./openapi.yml -o ./types -c ./config.json
  $ openapi-transformer-toolkit oas2ts -i ./openapi.yml -o ./types -c ./config.json -m
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
    '-m, --mute-console-log',
    'Mute console log when TypeScript types are generated successfully'
  )
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { oas2ts }
