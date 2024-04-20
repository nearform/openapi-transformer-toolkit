import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'src/**/*.ts'],
  dts: true,
  splitting: true,
  clean: true,
  minify: true,
  format: ['esm'],
  bundle: false,
  legacyOutput: true
})
