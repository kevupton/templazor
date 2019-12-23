import { getOptions } from 'loader-utils';
import { loader } from 'webpack';
import { Templazor } from './templazor/templazor';

export default function templazorLoader (this : loader.LoaderContext | any, input : string) {
  const options   = getOptions(this) || this.options || {};
  const templazor = new Templazor(input);

  return templazor.parse(options.scope);
}

export {
  Templazor,
}
