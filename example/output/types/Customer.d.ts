import { Address } from './Address'

/* tslint:disable */
/**
 * This file was automatically generated by oas-codegen CLI.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run oas-codegen CLI to regenerate this file.
 */

export interface Customer {
  id?: number;
  username?: string;
  address?: Address[];
  [k: string]: unknown;
}
