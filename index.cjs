const fs = require('fs-extra')
const path = require('path')

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
  registerSchemas
}
