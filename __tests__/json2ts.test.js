import fs from 'fs-extra'
import path from 'path'
import { runCommand } from '../src/commands/json2ts'
import { resolveFromPackageRoot } from '../src/utils/paths.js'

const TEST_DIRECTORY = resolveFromPackageRoot('__tests__', 'temp')

const inputPath = '__tests__/fixtures/schemas'
const outputPath = '__tests__/temp/types'

beforeAll(() => {
  fs.ensureDirSync(TEST_DIRECTORY)
})

afterEach(() => {
  fs.removeSync(TEST_DIRECTORY)
})

describe('json2ts', () => {
  describe('runCommand function', () => {
    it('should generate TypeScript types from JSON schemas', async () => {
      const customOptions = {
        bannerComment: '// DO NOT EDIT'
      }

      await runCommand(inputPath, outputPath, customOptions)

      const generatedFilePath = path.join(outputPath, 'Example.d.ts')
      expect(fs.existsSync(generatedFilePath)).toBeTruthy()

      const generatedFileContent = fs.readFileSync(generatedFilePath, 'utf-8')
      expect(generatedFileContent).toContain('// DO NOT EDIT')
      expect(generatedFileContent).toContain('export interface Example')
    })
  })
})
