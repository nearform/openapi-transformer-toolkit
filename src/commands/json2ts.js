import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import { compileFromFile } from 'json-schema-to-typescript'
import { exit } from 'process'
import { resolveFromWorkingDirectory } from '../utils/paths.js'
import { doNotEditText } from '../utils/do-not-edit-text.js'
import $RefParser from '@bcherny/json-schema-ref-parser'

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

export const runCommand = async (schemasPath, tsTypesPath, customOptions) => {
  let schemaPaths

  try {
    schemaPaths = fs.readdirSync(schemasPath)
  } catch (e) {
    console.error('❌ Could not find the JSON schemas folder')
    exit(1)
  }

  fs.ensureDirSync(tsTypesPath)

  const defaultOptions = {
    cwd: schemasPath,
    bannerComment: doNotEditText,
    declareExternallyReferenced: false
  }

  const options = { ...defaultOptions, ...customOptions }

  for (const schemaFileName of schemaPaths) {
    const schemaPath = resolveFromWorkingDirectory(schemasPath, schemaFileName)
    await generateAndWriteTsFile(schemaPath, tsTypesPath, options)
  }

  console.log('✅ TypeScript types generated successfully')
}

const readConfigFile = configPath => {
  const resolvedPath = resolveFromWorkingDirectory(configPath)

  try {
    return require(resolvedPath)
  } catch (error) {
    try {
      const fileContents = fs.readFileSync(resolvedPath, 'utf-8')
      return JSON.parse(fileContents)
    } catch (jsonError) {
      console.error(
        '❌ Could not load the config file as a JS module or parse it as JSON. Please check the file content.'
      )
      exit(1)
    }
  }
}

const main = () => {
  const options = json2ts.optsWithGlobals()
  const customOptions = options.config ? readConfigFile(options.config) : {}
  runCommand(options.input, options.output, customOptions)
}

const json2ts = new Command('json2ts')

const description = `This command will generate TypeScript types from JSON schemas.

Examples:
  $ openapi-codegen json2ts -i ./schemas -o ./types
  $ openapi-codegen json2ts -i ./schemas -o ./types -c ./config.json
  $ openapi-codegen json2ts -i ./schemas -o ./types -c ./config.js
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
