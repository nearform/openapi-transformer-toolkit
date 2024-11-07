import { $RefParser } from '@apidevtools/json-schema-ref-parser'
import { Command } from 'commander'
import fs from 'fs-extra'
import { compileFromFile } from 'json-schema-to-typescript'
import path from 'path'
import pino from 'pino'
import { format } from 'prettier'
import { exit } from 'process'
import type {
  Json2TsArgs,
  Json2TsDefaultOptions,
  Json2TsOptions
} from '../types/Json2TsOptions'
import { doNotEditText } from '../utils/do-not-edit-text.js'
import { readConfigFile } from '../utils/read-config-file.js'

const generateAndWriteTsFile = async (
  schemaPath: string,
  tsTypesPath: string,
  options: Json2TsOptions
) => {
  const ts = await compileFromFile(schemaPath, options)

  const interfaceName = path.basename(schemaPath, '.json')

  const parser = new $RefParser()
  await parser.dereference(schemaPath)

  const imports = Object.values(parser.$refs.values())
    .filter(
      refSchema =>
        refSchema.$id && refSchema.title && refSchema.title !== interfaceName
    )
    .map(
      refSchema =>
        `import { ${refSchema.title} } from './${refSchema.$id.replace(
          '.json',
          ''
        )}'`
    )
    .join('\n')

  const tsWithImports = `${imports ? `${imports}\n\n` : ''}${ts}`
  const tsFormatted = await format(tsWithImports, {
    parser: 'typescript',
    ...options.style
  })

  const tsFileName = path.basename(schemaPath, '.json') + '.d.ts'

  fs.writeFileSync(path.join(tsTypesPath, tsFileName), tsFormatted)
}

export const runCommand = async (
  schemasPath: string,
  tsTypesPath: string,
  customOptions?: Json2TsOptions,
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

  const defaultOptions: Json2TsDefaultOptions = {
    cwd: schemasPath,
    bannerComment: doNotEditText,
    declareExternallyReferenced: false
  }

  const options = { ...defaultOptions, ...customOptions }

  for (const schemaFileName of schemaPaths) {
    const schemaPath = path.join(schemasPath, schemaFileName)
    await generateAndWriteTsFile(schemaPath, tsTypesPath, options)
  }

  logger.info('✅ TypeScript types generated successfully from JSON schemas')
}

const main = () => {
  const options = json2ts.optsWithGlobals<Json2TsArgs>()
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
