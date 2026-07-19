import eslint from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-config-prettier/flat'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
  eslint.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  prettier,
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    }
  },
  {
    ignores: ['test/temp/**/*', 'example/**/*', 'dist/**/*', 'node_modules/**']
  }
]
