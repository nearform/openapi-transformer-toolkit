import { Logger } from "pino";

export type Oas2Tson = {
  input: string;
  output: string;
  properties?: string;
  excludeDereferencedIds?: boolean;
  logger?: Logger;
}
