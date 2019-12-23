import { Scope } from '../scope';

export type LogicResponse = {
  output: string;
  remainder: string[];
} | false

export interface Logic {
  (test: string[], scope: Scope) : LogicResponse;
}
