import { Logic } from './logic';

const START = '#{';
const END = '}';

const IS_INTERPOLATION = /#{([^}]*)}/;
const HAS_BEGINNING = /#{([^}]*)$/;

export const interpolationLogic: Logic = ([...lines], scope) => {
  let matches: RegExpMatchArray | null = null;

  do {
    while ((matches = IS_INTERPOLATION.exec(lines[0]))) {
      const match = matches[1];

      lines[0] = lines[0].replace(START + match + END, scope.execute(match));
    }

    matches = HAS_BEGINNING.exec(lines[0]);

    if (matches) {
      if (lines.length - 1 > 0) {
        lines[0] += lines[1];
        lines.splice(1, 1);
      }
      else {
        throw new Error('Missing a closing interpolation tag }');
      }
    }

  } while(matches);

  return {
    output: lines[0],
    remainder: lines.slice(1),
  }
};
