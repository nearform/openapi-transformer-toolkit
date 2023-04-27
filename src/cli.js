#!/usr/bin/env node

import { Command } from 'commander'
import { oas2json } from './commands/oas2json.js'
import { json2ts } from './commands/json2ts.js'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
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
