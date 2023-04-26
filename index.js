const fs = require('fs-extra')
const path = require('path')
const schemaGenerator = require('@openapi-contrib/openapi-schema-to-json-schema')
const YAML = require('yaml')
const json2Ts = require('json2ts')

const COMPONENT_REF_REGEXP = /#\/components\/schemas\/[^"]+/g

function schemaAdapter(generatedSchema, name) {
  delete generatedSchema.$schema
  generatedSchema.title = name
  generatedSchema.$id = `${name}.json`

  if (generatedSchema.format?.includes('date')) {
    generatedSchema.tsType = 'Date'
  }
}

function generateJsonSchemas(openAPIPath, schemasPath) {
  fs.removeSync(schemasPath)
  fs.ensureDirSync(schemasPath)

  const openAPIContent = fs.readFileSync(openAPIPath, 'utf8')
  const parsedOpenAPIContent = YAML.parse(openAPIContent)

  Object.entries(parsedOpenAPIContent.components.schemas).forEach(
    ([name, schema]) => {
      const generatedSchema = schemaGenerator.fromSchema(schema)
      schemaAdapter(generatedSchema, name)

      let stringifiedSchema = JSON.stringify(generatedSchema, undefined, 2)
      const results = stringifiedSchema.match(COMPONENT_REF_REGEXP)

      ;(results || []).forEach(element => {
        const refName = element.split('/').at(-1)

        stringifiedSchema = stringifiedSchema.replace(
          element,
          `${refName}.json`
        )
      })

      const destinationPath = path.join(schemasPath, `${name}.json`)
      fs.writeFileSync(destinationPath, stringifiedSchema)
    }
  )
}

function generateTsTypes(schemasPath, tsTypesPath) {
  const schemaPaths = fs.readdirSync(schemasPath)
  let tsTypes = ''

  schemaPaths.forEach(schemaFileName => {
    const schemaPath = path.join(schemasPath, schemaFileName)
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8')

    const tsType = json2Ts.convert(schemaContent)
    tsTypes += tsType
  })

  fs.writeFileSync(tsTypesPath, tsTypes)
}

function registerSchemas(fastifyInstance, schemaPackagePath) {
  const baseDir = path.join(schemaPackagePath)

  const schemaPaths = fs.readdirSync(baseDir)

  schemaPaths.forEach(schemaFileName => {
    const schemaPath = path.join(baseDir, schemaFileName)
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8')

    const schemaParsedContent = JSON.parse(schemaContent)
    fastifyInstance.addSchema(schemaParsedContent)
  })
}

module.exports = {
  generateJsonSchemas,
  generateTsTypes,
  registerSchemas
}
