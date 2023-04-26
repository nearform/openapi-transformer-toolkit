# OpenAPI Codegen

Effortlessly automate your design-first API development workflow with an npm package that generates JSON schemas, TypeScript types, and integrates with Fastify and React applications from OpenAPI specifications.


## Installation

Install the package with npm:

```sh
npm install --save bmg-api-tool
```

## Usage
First, import the necessary functions from the package:

```
const { generateJsonSchemas, generateTsTypes, registerSchemas } = require('bmg-api-tool');
```

### Generate JSON Schemas
To generate JSON schemas from your OpenAPI specification, provide the path to the OpenAPI file and the output directory for the generated schemas:

```
const openAPIPath = 'path/to/openapi.yml';
const schemasPath = 'path/to/output/schemas';
generateJsonSchemas(openAPIPath, schemasPath);
```

### Generate TypeScript Types
To generate TypeScript types from the generated JSON schemas, provide the path to the JSON schema directory and the output file for the TypeScript types:

```
const tsTypesPath = 'path/to/output/types.ts';
generateTsTypes(schemasPath, tsTypesPath);
```

### Register Schemas in Fastify
To register the generated JSON schemas in Fastify, provide a Fastify instance and the path to the schema package:

```
const fastify = require('fastify')();
const schemaPackagePath = 'path/to/schema/package';
registerSchemas(fastify, schemaPackagePath);
```

## License
MIT License

## Contributing
If you'd like to contribute to the project, please submit a pull request or open an issue on the project's GitHub repository.
