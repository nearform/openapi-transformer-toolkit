import $RefParser from '@bcherny/json-schema-ref-parser'
import { Command } from 'commander'
import fs from 'fs-extra'
import { compileFromFile } from 'json-schema-to-typescript'
import path from 'path'
import pino from 'pino'
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
  const schemaFolder = schemaPath.split('/').slice(-2, -1).join('/')
  const ts = await compileFromFile(schemaPath, options)

  const interfaceName = path.basename(schemaPath, '.json')

  const parser = new $RefParser()
  await parser.dereference(schemaPath)

  const imports = Object.values(parser.$refs.values())
    .filter(refSchema => {
      return (
        refSchema.$id &&
        refSchema.$id !== `${schemaFolder}/${interfaceName}.json`
      )
    })
    .map(refSchema => {
      let importFrom = ''
      if (refSchema.$id.startsWith(`${schemaFolder}/`)) {
        importFrom = `./${refSchema.title}`
      } else {
        importFrom = `../${refSchema.$id.replace('.json', '')}`
      }
      return `import { ${refSchema.title} } from '${importFrom}'`
    })
    .join('\n')

  const tsWithImports = `${imports ? `${imports}\n\n` : ''}${ts}`
  const tsFileName = path.basename(schemaPath, '.json') + '.d.ts'
  fs.writeFileSync(path.join(tsTypesPath, tsFileName), tsWithImports)
}

export const runCommand = async (
  // schemasPath: string,
  tempFolder: string,
  tsTypesPath: string,
  propertiesToExport?: string,
  customOptions?: Json2TsOptions,
  logger = pino()
) => {
  const definitionKeywords = [
    ...new Set([
      ...(propertiesToExport?.split(',') || []),
      'components.schemas'
    ])
  ]

  type pathInfoItem = {
    filename: string
    schemasPath: string
    tsTypesPath: string
  }
  const pathInfo: pathInfoItem[] = []

  definitionKeywords.forEach(key => {
    const schemasPath = path.join(tempFolder, key)
    let schemaPaths

    try {
      schemaPaths = fs.readdirSync(schemasPath)
    } catch (e) {
      logger.error('❌ Could not find the JSON schemas folder')
      exit(1)
    }
    const outputPath = path.join(tsTypesPath, key)
    schemaPaths.forEach(filename =>
      pathInfo.push({
        filename,
        schemasPath,
        tsTypesPath: outputPath
      })
    )

    fs.removeSync(outputPath)
    fs.ensureDirSync(outputPath)
  })

  for (const { schemasPath, filename, tsTypesPath } of pathInfo) {
    const defaultOptions: Json2TsDefaultOptions = {
      cwd: schemasPath,
      bannerComment: doNotEditText,
      declareExternallyReferenced: false
    }

    const options = { ...defaultOptions, ...customOptions }

    const schemaPath = path.join(schemasPath, filename)
    await generateAndWriteTsFile(schemaPath, tsTypesPath, options)
    // break
  }

  // for (const schemaFileName of schemaPaths) {
  //   const schemaPath = path.join(schemasPath, schemaFileName)
  //   await generateAndWriteTsFile(schemaPath, tsTypesPath, options)
  // }

  logger.info('✅ TypeScript types generated successfully from JSON schemas')
}

const main = () => {
  const options = json2ts.optsWithGlobals<Json2TsArgs>()
  const customOptions = options.config ? readConfigFile(options.config) : {}
  runCommand(
    options.input,
    options.output,
    options.properties,
    customOptions,
    options.muteLogger
  )
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
  .option(
    '-p, --properties <string>',
    'Comma-separated list of properties to convert from the OpenAPI file'
  )
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { json2ts }
