declare type Ejs = typeof import('ejs');

export * from 'ejs';

export interface superEjsOption  {
  parseFilename?: boolean | ((original: string) => string);
  ignore?: string | ReadonlyArray<string> | undefined;
  debug?: boolean;
}

export const gerenateDir: (
  cwd: string,
  tplDir: string,
  data?: ejs.Data,
  options?: ejs.Options,
  superEjsOptions?: superEjsOption,
) => Promise<void>;

export declare interface SuperEjs extends Ejs {
  gerenateDir: typeof gerenateDir;
}

declare const superEjs: SuperEjs;

export default superEjs;
