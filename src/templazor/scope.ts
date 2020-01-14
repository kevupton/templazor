export interface ScopeObject {
  [key: string]: any;
}

export class Scope {
  private readonly scopes: ScopeObject[] = [];

  private activeScope: ScopeObject = {};

  constructor(
    private readonly defaultScope: ScopeObject = {}
  ) {
    this.updateActiveScope();
  }

  public in(scope?: ScopeObject) {
    if (scope) {
      this.scopes.push(scope);
      this.updateActiveScope();
    }
  }

  public out() {
    const item = this.scopes.pop();
    if (item) {
      this.updateActiveScope();
    }
  }

  private updateActiveScope() {
    this.activeScope = Object.assign({}, this.defaultScope, ...this.scopes);
  }

  public get(key: string) {
    return this.activeScope[key];
  }

  // @ts-ignore
  public execute(command: string) {
    // @ts-ignore
    with(this.activeScope) {
      return eval(command);
    }
  }
}
