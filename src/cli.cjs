#!/usr/bin/env node

const { Command } = require('commander')
const { generateJsonSchema } = require('./commands/generate-json-schema.cjs')
const { generateTsTypes } = require('./commands/generate-ts-types.cjs')
const packageJson = require('../package.json')

const program = new Command()
program
  .name('oas-codegen')
  .description(
    'Generating schemas and types from OpenAPI for Fastify and React apps'
  )
  .version(packageJson.version)
  .option('-d, --debug', 'Output debugging information')

program.addCommand(generateJsonSchema)
program.addCommand(generateTsTypes)

program.parse()
