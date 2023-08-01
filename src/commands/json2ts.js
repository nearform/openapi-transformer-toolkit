import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import { compileFromFile } from 'json-schema-to-typescript'
import { exit } from 'process'
import pino from 'pino'
import $RefParser from '@bcherny/json-schema-ref-parser'
import { readConfigFile } from '../utils/read-config-file.js'
import { doNotEditText } from '../utils/do-not-edit-text.js'

const generateAndWriteTsFile = async (schemaPath, tsTypesPath, options) => {
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
  const tsFileName = path.basename(schemaPath, '.json') + '.d.ts'

  fs.writeFileSync(path.join(tsTypesPath, tsFileName), tsWithImports)
}

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

  const defaultOptions = {
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
  const options = json2ts.optsWithGlobals()
  const customOptions = options.config ? readConfigFile(options.config) : {}
  // JSON schemas will always be generated under components.schemas inside the specified
  //  input path, so interpolate that into the string here for use downstream
  const schemasPath = `${options.input}/components.schemas`
  runCommand(schemasPath, options.output, customOptions, options.muteLogger)
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
