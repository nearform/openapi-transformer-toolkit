import { Command } from 'commander'
import filenamify from 'filenamify'
import fs from 'fs-extra'
import _get from 'lodash.get'
import _trimStart from 'lodash.trimstart'
import path from 'path'
import pino from 'pino'
import { exit } from 'process'
import YAML from 'yaml'

import { fromSchema } from '../utils/openapi-schema-to-json-schema-wrapper.cjs'

const COMPONENT_REF_REGEXP = /#\/components\/schemas\/[^"]+/g
let hasComponentsSchemaReferences = false

export const adaptSchema = (generatedSchema, name, filename) => {
  delete generatedSchema.$schema
  generatedSchema.title = name
  generatedSchema.$id = `${filename}.json`

  if (generatedSchema.format?.includes('date')) {
    generatedSchema.tsType = 'Date'
  }
}

const processSchema = (name, schema, schemasPath, logger, dirname = '') => {
  let generatedSchema
  try {
    generatedSchema = fromSchema(schema)
  } catch (error) {
    logger.warn('Failed to convert non-object attribute, skipping')
    return
  }

  // for elements in an array the name would be its index in the array,
  // so go into the parsed schema to get the actual name so that the files
  // are more easily identifiable
  if (!isNaN(Number(name))) {
    name = generatedSchema.name
  }

  const filename = _trimStart(filenamify(name, { replacement: '-' }), '-')
  adaptSchema(generatedSchema, name, filename)

  let stringifiedSchema = JSON.stringify(generatedSchema, undefined, 2)
  const schemaRefs = stringifiedSchema.match(COMPONENT_REF_REGEXP)

  ;(schemaRefs || []).forEach(element => {
    if (!hasComponentsSchemaReferences) {
      // set the flag to indicate that we need to process components.schemas
      // once finished if the user didn't explicitly pass it so that the
      // referenced files exist in the output
      hasComponentsSchemaReferences = true
    }
    let refName = element.split('/').slice(-1)
    if (dirname && dirname !== 'components.schemas') {
      refName = `../components.schemas/${refName}`
    }
    stringifiedSchema = stringifiedSchema.replace(element, `${refName}.json`)
  })

  const destinationDir = path.join(schemasPath, dirname)
  const destinationPath = path.join(destinationDir, `${filename}.json`)
  fs.ensureDirSync(destinationDir)
  fs.writeFileSync(destinationPath, stringifiedSchema)
}

const writeSchemaToFile = (parsedContent, property, outputPath, logger) => {
  const desired = _get(parsedContent, property)
  const directoryName = filenamify(property, { replacement: '-' })

  Object.entries(desired).forEach(([name, schema]) => {
    processSchema(name, schema, outputPath, logger, directoryName)
  })
}

export const runCommand = (
  openApiPath,
  schemasPath,
  propertiesToExport = 'components.schemas',
  logger = pino()
) => {
  hasComponentsSchemaReferences = false

  fs.removeSync(schemasPath)
  fs.ensureDirSync(schemasPath)

  let openAPIContent

  try {
    openAPIContent = fs.readFileSync(openApiPath, 'utf8')
  } catch (e) {
    logger.error('❌ Could not find the OpenAPI file')
    exit(1)
  }

  const parsedOpenAPIContent = YAML.parse(openAPIContent)

  propertiesToExport.split(',').forEach(property => {
    writeSchemaToFile(parsedOpenAPIContent, property, schemasPath, logger)
  })

  if (
    hasComponentsSchemaReferences &&
    !propertiesToExport.includes('components.schemas')
  ) {
    logger.info(
      'ℹ️ Property(/ies) being converted contain references to a schema file, parsing components.schemas in addition to ensure these files are available'
    )
    writeSchemaToFile(
      parsedOpenAPIContent,
      'components.schemas',
      schemasPath,
      logger
    )
  }

  logger.info('✅ JSON schemas generated successfully from OpenAPI file')
}

const main = () => {
  const options = oas2json.optsWithGlobals()
  runCommand(options.input, options.output, options.properties, options.logger)
}

const oas2json = new Command('oas2json')

const description = `This command will generate JSON schemas from an OpenAPI file.

Examples:
  $ openapi-transformer-toolkit oas2json -i ./openapi.yml -o ./schemas
`

oas2json
  .summary('Create JSON schemas from an OpenAPI file')
  .description(description)
  .requiredOption('-i, --input <string>', 'Path to the OpenAPI file')
  .requiredOption(
    '-o, --output <string>',
    'Path to the folder where to output the schemas'
  )
  .option(
    '-p, --properties <string>',
    'Comma-separated list of properties to convert from the OpenAPI file'
  )
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { oas2json }
