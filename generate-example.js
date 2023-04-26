const path = require('path')
const { generateJsonSchemas, generateTsTypes } = require('.')

function generateAll(inputPath, outputPath) {
  const SCHEMAS_PATH = path.join(outputPath, 'schemas')
  const TYPES_PATH = path.join(outputPath, 'types.ts')

  // Generate JSON schemas
  generateJsonSchemas(inputPath, SCHEMAS_PATH)

  // Generate TypeScript types
  generateTsTypes(SCHEMAS_PATH, TYPES_PATH)
}

const inputPath = process.argv[2]
const outputPath = process.argv[3]

if (inputPath && outputPath) {
  generateAll(inputPath, outputPath)
}
