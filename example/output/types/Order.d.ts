/* tslint:disable */
/**
 * This file was automatically generated by oas-codegen CLI.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run oas-codegen CLI to regenerate this file.
 */

export interface Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  /**
   * Order Status
   */
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
  [k: string]: unknown;
}
