import { adaptSchema, runCommand } from '../src/commands/oas2json.js'
import fs from 'fs-extra'
import { resolveFromPackageRoot } from '../src/utils/paths.js'

describe('oas2json', () => {
  describe('adaptSchema function', () => {
    it('should properly modify the generated schema object', () => {
      const schema = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'string',
        format: 'date'
      }

      adaptSchema(schema, 'TestSchema')

      expect(schema).toEqual({
        type: 'string',
        format: 'date',
        title: 'TestSchema',
        $id: 'TestSchema.json',
        tsType: 'Date'
      })
    })
  })

  const TEST_DIRECTORY = resolveFromPackageRoot('__tests__', 'temp')

  describe('runCommand function', () => {
    const inputPath = './__tests__/fixtures/openapi.yml'
    const outputPath = './__tests__/temp/schemas'

    afterAll(() => {
      fs.removeSync(TEST_DIRECTORY)
    })

    it('should generate JSON schema files from the OpenAPI input', () => {
      runCommand(inputPath, outputPath)

      const generatedFiles = fs.readdirSync(outputPath)
      expect(generatedFiles).toContain('Example.json')

      const exampleSchema = fs.readJsonSync(
        resolveFromPackageRoot(outputPath, 'Example.json')
      )
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
})
