export type Case = 
  | 'camel-case'
  | 'lower-camel-case'
  | 'capital-case'
  | 'constant-case'
  | 'dot-case'
  | 'header-case'
  | 'no-case'
  | 'param-case'
  | 'kebab'
  | 'pascal-case'
  | 'upper-camel-case'
  | 'path-case'
  | 'sentence-case'
  | 'snake-case';
declare function changeCase(s: string, _case?: Case): string;
export default changeCase;
