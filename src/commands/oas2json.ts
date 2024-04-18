import { Command } from 'commander'
import filenamify from 'filenamify'
import fs from 'fs-extra'
import _get from 'lodash.get'
import _trimStart from 'lodash.trimstart'
import path from 'path'
import pino from 'pino'
import { exit } from 'process'
import YAML from 'yaml'

import type { JSONSchema4 } from 'json-schema'

import { fromSchema } from '../utils/openapi-schema-to-json-schema-wrapper.js'

const COMPONENT_REF_REGEXP =
  /#\/components\/(callbacks|examples|headers|links|parameters|requestBodies|responses|schemas|securitySchemes)\/[^"]+/g
const INVALID_URI_CHARS_REGEXP = /[^a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]/g

export const adaptSchema = (
  generatedSchema: JSONSchema4,
  name: string,
  filename: string
) => {
  const sanitizedFilename = filename.replace(INVALID_URI_CHARS_REGEXP, '')
  delete generatedSchema.$schema
  generatedSchema.title = name
  generatedSchema.$id = `${sanitizedFilename}.json`

  if (generatedSchema.format?.includes('date')) {
    generatedSchema.tsType = 'Date'
  }
}

const processSchema = (
  schema: JSONSchema4,
  schemasPath: string,
  definitionKeyword: string,
  isArray: boolean
) => {
  Object.entries(schema).forEach(([key, value]) => {
    // for elements in an array the name would be its index if we were
    // to just use its key, so go into the parsed schema and get the
    // actual name so the files are more easily identifiable
    const name = isArray ? value.name : key
    const filename = _trimStart(filenamify(name, { replacement: '-' }), '-')

    adaptSchema(value, name, filename)

    let schemaAsString = JSON.stringify(value, null, 2)
    const refs = schemaAsString.match(COMPONENT_REF_REGEXP)
    refs?.forEach(ref => {
      const refName = ref.split('/').slice(-1)
      schemaAsString = schemaAsString.replace(ref, `${refName}.json`)
    })

    const destinationDir = path.join(schemasPath, definitionKeyword)
    const destinationPath = path.join(destinationDir, `${filename}.json`)

    fs.ensureDirSync(destinationDir)
    fs.writeFileSync(destinationPath, schemaAsString)
  })
}

export const runCommand = (
  openApiPath: string,
  schemasPath: string,
  propertiesToExport?: string,
  logger = pino()
) => {
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

  const definitionKeywords = [
    ...new Set([
      ...(propertiesToExport?.split(',') || []),
      'components.schemas'
    ])
  ]

  try {
    const generatedSchema = fromSchema(parsedOpenAPIContent, {
      definitionKeywords
    })

    definitionKeywords.forEach(key => {
      const schema: JSONSchema4 = _get(generatedSchema, key)
      const isArray = Array.isArray(_get(parsedOpenAPIContent, key))
      processSchema(schema, schemasPath, key, isArray)
    })
  } catch (error) {
    logger.warn('Failed to convert non-object attribute, skipping')
    return
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
