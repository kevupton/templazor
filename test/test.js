const options = require('../dist/main');

console.log(options);

console.log(options.templazorLoader.call({ options: {scope: {test: [1, 2, 3]}}}, `
@foreach value in test
  #{ value }
@endforeach

@if 2 === 2
  Hello there my name is #{1 + 1}
@endif
`));
