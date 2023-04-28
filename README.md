# OpenAPI Codegen

Effortlessly automate your design-first API development workflow with an npm package that generates JSON schemas, TypeScript types, and integrates with Fastify and React applications from OpenAPI specifications.

## Installation
First, install the package:

```sh
$ npm install @neaform/oas-codegen
```

## CLI

The package includes CLI commands for easier usage. First, install the package globally:

```sh
$ npm install @nearform/oas-codegen
```

Then, use the oas-codegen command followed by the subcommand and required options:

- oas-codegen oas2json -i < input > -o < output >: Generate JSON schemas from an OpenAPI file
- oas-codegen json2ts -i < input > -o < output > [-c < config >]: Generate TypeScript types from JSON schemas
For example:

```sh
$ oas-codegen oas2json -i ./openapi.yml -o ./schemas
$ oas-codegen json2ts -i ./schemas -o ./types
```

## Programmatic Usage
You can also use the package programmatically by importing the necessary functions:

```javascript
const { generateJsonSchemas, generateTsTypes, registerSchemas } = require('oas-codegen');
```

### Generate JSON Schemas
To generate JSON schemas from your OpenAPI specification, provide the path to the OpenAPI file and the output directory for the generated schemas:

```javascript
const openAPIPath = 'path/to/openapi.yml';
const schemasPath = 'path/to/output/schemas';
generateJsonSchemas(openAPIPath, schemasPath);
```

### Generate TypeScript Types
To generate TypeScript types from the generated JSON schemas, provide the path to the JSON schema directory and the output directory for the TypeScript types:

```javascript
const schemasPath = 'path/to/output/schemas';
const tsTypesPath = 'path/to/output/types';
generateTsTypes(schemasPath, tsTypesPath);
```

## License
MIT License

## Contributing
If you'd like to contribute to the project, please submit a pull request or open an issue on the project's GitHub repository.
