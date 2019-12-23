import { ScopeObject } from '../scope';
import { logics } from './index';
import { Logic } from './logic';

const FOREACH_STATEMENT    = /^\s*@foreach ([a-z_A-Z0-9]+)(?:,([a-z_A-Z0-9]))? in (.*)\s*$/;
const ENDFOREACH_STATEMENT = /^\s*@endforeach\s*$/;

export const forEachLogic : Logic = (lines, scope) => {
  const matches = FOREACH_STATEMENT.exec(lines[0]);
  if (!matches) {
    return false;
  }

  let totalForeachs = 0;
  let output        = '';

  const valueKey = matches[1];
  const indexKey = matches[2];
  const arrayKey = matches[3];

  const endIndex = lines.findIndex(line => {
    if (FOREACH_STATEMENT.test(line)) {
      totalForeachs++;
    }
    else if (ENDFOREACH_STATEMENT.test(line)) {
      totalForeachs--;
    }
    return totalForeachs === 0;
  });

  if (endIndex === -1) {
    throw new Error('Missing a closing @endforeach statement');
  }

  const array = scope.get(arrayKey);

  if (!Array.isArray(array)) {
    throw new Error('@foreach requires an array. Key `' + arrayKey + '` is ' + typeof array);
  }

  console.log(array);
  array.forEach((value, index) => {

    const newScope : ScopeObject = {};
    if (indexKey) {
      newScope[indexKey] = index;
    }
    newScope[valueKey] = value;

    scope.in(newScope);

    output += logics(lines.slice(1, endIndex), scope) + '\n';

    scope.out();
  });

  const remainder = lines.slice(endIndex + 1);

  return {
    output,
    remainder,
  };
};
