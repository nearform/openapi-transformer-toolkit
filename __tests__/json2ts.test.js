import fs from 'fs-extra'
import path from 'path'
import { runCommand } from '../src/commands/json2ts'
import { resolveFromPackageRoot } from '../src/utils/paths.js'

const TEST_DIR = resolveFromPackageRoot('__tests__', 'test_output')

beforeAll(() => {
  fs.ensureDirSync(TEST_DIR)
})

afterAll(() => {
  // fs.removeSync(TEST_DIR)
})

describe('json2ts', () => {
  it('should generate TypeScript types from JSON schemas', async () => {
    const inputPath = '__tests__/test_output/schemas'
    const outputPath = '__tests__/test_output/types'

    const customOptions = {
      bannerComment: '// Test banner comment'
    }

    await runCommand(inputPath, outputPath, customOptions)

    const generatedFilePath = path.join(outputPath, 'Example.d.ts')
    expect(fs.existsSync(generatedFilePath)).toBeTruthy()

    const generatedFileContent = fs.readFileSync(generatedFilePath, 'utf-8')
    expect(generatedFileContent).toContain('Test banner comment')
    expect(generatedFileContent).toContain('export interface Example')
  })
})
