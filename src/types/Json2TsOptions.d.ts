import { Options } from 'json-schema-to-typescript'
import { Logger } from 'pino'

export type Json2TsArgs = {
  input: string
  output: string
  config?: string
  muteLogger?: Logger
}

export type Json2TsDefaultOptions = Pick<
  Options,
  'cwd' | 'bannerComment' | 'declareExternallyReferenced'
>

export type Json2TsOptions = Partial<Options>
