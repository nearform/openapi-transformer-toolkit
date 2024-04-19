import { Command } from 'commander'
import filenamify from 'filenamify'
import fs from 'fs-extra'
import _get from 'lodash.get'
import _trimStart from 'lodash.trimstart'
import path from 'path'
import pino from 'pino'
import { exit } from 'process'
import YAML from 'yaml'
import $RefParser from '@apidevtools/json-schema-ref-parser'

import { fromSchema } from '../utils/openapi-schema-to-json-schema-wrapper.cjs'
import prettier from 'prettier'
import os from 'os'

const COMPONENT_REF_REGEXP = /#\/components\/schemas\/[^"]+/g
let outputSchemasMetaData = []

export const adaptSchema = (generatedSchema, name, filename) => {
  delete generatedSchema.$schema
  generatedSchema.title = name
  generatedSchema.$id = `${filename}.json`

  if (generatedSchema.format?.includes('date')) {
    generatedSchema.tsType = 'Date'
  }
}

const processSchema = (schema, schemasPath, definitionKeyword, isArray) => {
  Object.entries(schema).forEach(([key, value]) => {
    // for elements in an array the name would be its index if we were
    // to just use its key, so go into the parsed schema and get the
    // actual name so the files are more easily identifiable
    const name = isArray ? value.name : key
    const filename = _trimStart(filenamify(name, { replacement: '-' }), '-')

    adaptSchema(value, name, filename)

    let schemaAsString = JSON.stringify(value, null, 2)
    // N.B. - this obviously only supports refs where the string contains 'components/schemas'
    // if we want to support refs in places other than this, we'll need to revisit this
    // approach to be more flexible
    const refs = schemaAsString.match(COMPONENT_REF_REGEXP)
    refs?.forEach(ref => {
      const refName = ref.split('/').slice(-1)
      schemaAsString = schemaAsString.replace(ref, `${refName}.json`)
    })

    const destinationDir = path.join(schemasPath, 'tempjson')
    const destinationPath = path.join(destinationDir, `${filename}.json`)

    outputSchemasMetaData.push({ dir: destinationDir, path: destinationPath })

    fs.ensureDirSync(destinationDir)
    fs.writeFileSync(destinationPath, schemaAsString)
  })
}

const processJSON = async (schemasPath, tempdir, excludeDereferencedIds) => {
  fs.ensureDirSync(schemasPath)
  const formattedSchemas = []
  for (const currentSchema of outputSchemasMetaData) {
    /**
     * monitor https://github.com/APIDevTools/json-schema-ref-parser/issues/342
     * to check if they accept a flag to exclude Ids and eventually remove the onDereference callback
     */
    const dereferencedSchema = await $RefParser.dereference(
      currentSchema.path,
      excludeDereferencedIds
        ? {
            dereference: {
              onDereference: (path, value) => {
                delete value.$id
              }
            }
          }
        : null
    )

    const fileName = path.parse(currentSchema.path).name
    const tsSchema = `export const ${fileName} = ${JSON.stringify(
      dereferencedSchema
    )} as const`
    const formattedSchema = await prettier.format(tsSchema, {
      parser: 'typescript'
    })
    formattedSchemas.push(formattedSchema)
  }
  fs.writeFileSync(
    path.join(schemasPath, `types.ts`),
    formattedSchemas.join('\n')
  )
  fs.removeSync(path.join(tempdir, 'tempjson'))
}

export const runCommand = async (
  openApiPath,
  schemasPath,
  propertiesToExport,
  excludeDereferencedIds,
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

    const tempdir = os.tmpdir()
    definitionKeywords.forEach(key => {
      const schema = _get(generatedSchema, key)
      const isArray = Array.isArray(_get(parsedOpenAPIContent, key))
      processSchema(schema, tempdir, key, isArray)
    })
    await processJSON(schemasPath, tempdir, excludeDereferencedIds)
  } catch (error) {
    logger.warn(error, 'Failed to convert non-object attribute, skipping')
    return
  }

  logger.info('✅ TS schemas generated successfully from OpenAPI file')
}

const main = () => {
  const options = oas2tson.optsWithGlobals()
  runCommand(
    options.input,
    options.output,
    options.properties,
    options.excludeDereferencedIds,
    options.logger
  )
}

const oas2tson = new Command('oas2tson')

const description = `This command will generate JSON schemas from an OpenAPI file.

Examples:
  $ openapi-transformer-toolkit oas2tson -i ./openapi.yml -o ./schemas
`

oas2tson
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
  .option('--excludeDereferencedIds', 'exclude $id of dereferenced schemas')
  .allowUnknownOption()
  .allowExcessArguments(true)
  .action(main)

export { oas2tson }
