import { schemaAdapter, runCommand } from '../src/commands/oas2json.js'
import fs from 'fs-extra'
import path from 'path'

describe('schemaAdapter', () => {
  it('should properly modify the generated schema object', () => {
    const schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'string',
      format: 'date'
    }

    schemaAdapter(schema, 'TestSchema')

    expect(schema).toEqual({
      type: 'string',
      format: 'date',
      title: 'TestSchema',
      $id: 'TestSchema.json',
      tsType: 'Date'
    })
  })
})

describe('runCommand', () => {
  const inputPath = './__tests__/fixtures/openapi.yml'
  const outputPath = './__tests__/test_output/schemas'

  afterEach(() => {
    // Clean up the output directory after each test
    fs.removeSync(outputPath)
  })

  it('should generate JSON schema files from the OpenAPI input', () => {
    runCommand(inputPath, outputPath)

    const generatedFiles = fs.readdirSync(outputPath)
    expect(generatedFiles).toContain('Example.json')

    const exampleSchema = fs.readJsonSync(path.join(outputPath, 'Example.json'))
    expect(exampleSchema.title).toBe('Example')
    expect(exampleSchema.$id).toBe('Example.json')
    expect(exampleSchema.properties).toEqual({
      id: { type: 'string' },
      name: { type: 'string' },
      surname: { type: 'string' }
    })
    expect(exampleSchema.required).toEqual(['id', 'name', 'surname'])
  })
})
