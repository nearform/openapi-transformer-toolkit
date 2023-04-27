#!/usr/bin/env node

const { Command } = require('commander')
const { oas2json } = require('./commands/oas2json.cjs')
const { json2ts } = require('./commands/json2ts.cjs')
const packageJson = require('../package.json')

const program = new Command()
program
  .name('oas-codegen')
  .description(
    'Generating schemas and types from OpenAPI for Fastify and React apps'
  )
  .version(packageJson.version)
  .option('-d, --debug', 'Output debugging information')

program.addCommand(oas2json)
program.addCommand(json2ts)

program.parse()
