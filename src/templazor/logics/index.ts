import { Scope } from '../scope';
import { forEachLogic } from './for';
import { ifLogic } from './if';
import { interpolationLogic } from './interpolation';
import { Logic, LogicResponse } from './logic';

export const logicsOrder: Logic[] = [
  ifLogic,
  forEachLogic,
  interpolationLogic,
];


export function logics(lines: string[], scope: Scope) {
  let output = '';

  while (lines.length) {
    let result: LogicResponse = false;
    for (let logic of logicsOrder) {
      result = logic(lines, scope);
      if (result) {
        break;
      }
    }

    if (result) {
      output += result.output;
      lines = result.remainder;
    } else {
      output += (output ? '\n' : '') + lines.shift();
    }
  }

  return output;
}
