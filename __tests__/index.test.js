const fs = require('fs-extra')
const path = require('path')
const {
  generateJsonSchemas,
  generateTsTypes,
  registerSchemas
} = require('../index')

const TEST_DIR = path.join(__dirname, 'test_output')
const OPENAPI_PATH = path.join(__dirname, 'fixtures', 'openapi.yml')
const SCHEMAS_PATH = path.join(TEST_DIR, 'schemas')
const TSTYPES_PATH = path.join(TEST_DIR, 'types.ts')

beforeEach(() => {
  fs.ensureDirSync(TEST_DIR)
})

afterEach(() => {
  fs.removeSync(TEST_DIR)
})

test('generateJsonSchemas should create JSON schemas', () => {
  generateJsonSchemas(OPENAPI_PATH, SCHEMAS_PATH)

  const files = fs.readdirSync(SCHEMAS_PATH)
  expect(files.length).toBeGreaterThan(0)
  files.forEach(file => {
    const schema = fs.readJsonSync(path.join(SCHEMAS_PATH, file))
    expect(schema).toHaveProperty('$id')
    expect(schema).toHaveProperty('type')
  })
})

test('generateTsTypes should create TypeScript types', () => {
  generateJsonSchemas(OPENAPI_PATH, SCHEMAS_PATH)
  generateTsTypes(SCHEMAS_PATH, TSTYPES_PATH)

  const types = fs.readFileSync(TSTYPES_PATH, 'utf8')
  expect(types).toContain('interface')
  expect(types).toContain('type')
})

test('registerSchemas should register schemas to Fastify instance', () => {
  generateJsonSchemas(OPENAPI_PATH, SCHEMAS_PATH)

  const fastifyInstanceMock = {
    addSchema: jest.fn()
  }

  registerSchemas(fastifyInstanceMock, SCHEMAS_PATH)

  const files = fs.readdirSync(SCHEMAS_PATH)
  expect(fastifyInstanceMock.addSchema).toHaveBeenCalledTimes(files.length)

  files.forEach(file => {
    const filePath = path.join(SCHEMAS_PATH, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const schemaContent = JSON.parse(fileContent)

    expect(fastifyInstanceMock.addSchema).toHaveBeenCalledWith(schemaContent)
  })
})
