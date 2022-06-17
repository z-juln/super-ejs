const {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  pascalCase,
  paramCase,
  pathCase,
  sentenceCase,
  snakeCase,
} = require('change-case');

const caseMap = {
  'camel-case': camelCase,
  'lower-camel-case': camelCase,
  'capital-case': capitalCase,
  'constant-case': constantCase,
  'dot-case': dotCase,
  'header-case': headerCase,
  'no-case': noCase,
  'param-case': paramCase,
  'kebab': paramCase,
  'pascal-case': pascalCase,
  'upper-camel-case': pascalCase,
  'path-case': pathCase,
  'sentence-case': sentenceCase,
  'snake-case': snakeCase,
};

const changeCase = (s, _case = 'kebab') => {
  const parseFn = caseMap[_case];
  if (!parseFn) throw new Error('case不存在');
  return parseFn(s);
};

export default changeCase;
