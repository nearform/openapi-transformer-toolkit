/* tslint:disable */
/**
 * This file was automatically generated by oas-codegen CLI.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run oas-codegen CLI to regenerate this file.
 */

export interface Pet {
  id?: number;
  name: string;
  category?: Category;
  photoUrls: string[];
  tags?: Tag[];
  /**
   * pet status in the store
   */
  status?: "available" | "pending" | "sold";
  [k: string]: unknown;
}
export interface Category {
  id?: number;
  name?: string;
  [k: string]: unknown;
}
export interface Tag {
  id?: number;
  name?: string;
  [k: string]: unknown;
}
