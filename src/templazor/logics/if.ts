import { logics } from './index';
import { Logic } from './logic';

const IF_STATEMENT    = /^\s*@if (.*?)\s*$/;
const ENDIF_STATEMENT = /^\s*@endif\s*$/;

export const ifLogic : Logic = (lines, scope) => {
  const result = IF_STATEMENT.exec(lines[0]);
  if (!result) {
    return false;
  }

  let totalIfs = 0;

  const endIfIndex = lines.findIndex(line => {
    if (IF_STATEMENT.test(line)) {
      totalIfs++;
    }
    else if (ENDIF_STATEMENT.test(line)) {
      totalIfs--;
    }
    return totalIfs === 0;
  });

  if (endIfIndex === -1) {
    throw new Error('Missing a closing @endif statement');
  }

  const ifStatementResult = scope.execute(result[1]);

  const linesIfTrue = lines.slice(1, endIfIndex);
  const remainder   = lines.slice(endIfIndex + 1);

  let output = ifStatementResult ? logics(linesIfTrue, scope) : '';
  output += '\n';

  return {
    output,
    remainder,
  };
};
