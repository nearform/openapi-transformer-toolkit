import { Category } from './Category';
import { Tag } from './Tag';

/* eslint-disable */
/**
 * This file was automatically generated by openapi-transformer-toolkit CLI/methods.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source OpenAPI file,
 * and run openapi-transformer-toolkit CLI/methods to regenerate this file.
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
  status?: 'available' | 'pending' | 'sold';
  /**
   * example nullable value
   */
  nullableValue?: string | null;
  [k: string]: unknown;
}
