import ejs from 'ejs';

export * from 'ejs';

export const gerenateDir: (
  cwd: string,
  tplDir: string,
  data?: ejs.Data,
  options?: ejs.Options
) => Promise<void>;

export default {
  ...ejs,
  gerenateDir,
};
