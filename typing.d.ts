declare type Ejs = typeof import('ejs');

export * from 'ejs';

export const gerenateDir: (
  cwd: string,
  tplDir: string,
  data?: ejs.Data,
  options?: ejs.Options
) => Promise<void>;

export declare interface SuperEjs extends Ejs {
  gerenateDir: typeof gerenateDir;
}

declare const superEjs: SuperEjs;

export default superEjs;
