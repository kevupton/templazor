import { logics } from './logics/index';
import { Scope, ScopeObject } from './scope';

export class Templazor {

  constructor (
    private readonly template : string,
  ) {
  }

  parse (defaultScope : ScopeObject = {}) {
    return logics(this.template.split('\n'), new Scope(defaultScope));
  }
}
