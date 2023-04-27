module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!(json2ts)/)'],
  moduleFileExtensions: ['cjs', 'js', 'json', 'node'],
  testPathIgnorePatterns: ['/test_output/']
}
