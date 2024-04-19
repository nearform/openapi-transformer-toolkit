import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import { compileFromFile } from 'json-schema-to-typescript'
import { exit } from 'process'
import pino from 'pino'
import { readConfigFile } from '../utils/read-config-file.js'
import { doNotEditText } from '../utils/do-not-edit-text.js'

export const runCommand = async (
  schemasPath,
  tsTypesPath,
  customOptions,
  logger = pino()
) => {
  fs.removeSync(tsTypesPath)
  fs.ensureDirSync(tsTypesPath)

  let schemaPaths

  try {
    schemaPaths = fs.readdirSync(schemasPath)
  } catch (e) {
    logger.error('❌ Could not find the JSON schemas folder')
    exit(1)
  }

  const types = []

  for (const [index, schemaFileName] of schemaPaths.entries()) {
    const defaultOptions = {
      cwd: schemasPath,
      bannerComment: null,
      declareExternallyReferenced: false
    }

    if (index === 0) {
      defaultOptions.bannerComment = doNotEditText
    }

    const options = { ...defaultOptions, ...customOptions }

    const schemaPath = path.join(schemasPath, schemaFileName)
    const ts = await compileFromFile(schemaPath, options)
    types.push(ts)
  }

  fs.writeFileSync(path.join(tsTypesPath, 'types.d.ts'), types.join('\n'))

  logger.info('✅ TypeScript types generated successfully from JSON schemas')
}

const main = () => {
  const options = json2ts.optsWithGlobals()
  const customOptions = options.config ? readConfigFile(options.config) : {}
  runCommand(options.input, options.output, customOptions, options.muteLogger)
}

const json2ts = new Command('json2ts')

const description = `This command will generate TypeScript types from JSON schemas.

Examples:
  $ openapi-transformer-toolkit json2ts -i ./schemas -o ./types
  $ openapi-transformer-toolkit json2ts -i ./schemas -o ./types -c ./config.json
`

json2ts
  .summary('Creates TypeScript types from JSON schemas')
  .description(description)
  .requiredOption('-i, --input <string>', 'Path to the JSON schemas folder')
  .requiredOption(
    '-o, --output <string>',
    'Path to the folder where to output the TS files'
  )
  .option(
    '-c, --config <string>',
    'Path to the JSON/JS config file with these possible options: https://www.npmjs.com/package/json-schema-to-typescript'
  )
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { json2ts }
