const superEjs = require('../index');
const path = require('path');

const name = 'Demo';

try {
  superEjs.gerenateDir(
    path.resolve(__dirname, './build'),
    path.resolve(__dirname, './template/component'),
    { name },
    {},
    {
      parseFilename(original) {
        console.log({ original });
        return original.replace('__name__', name);
      },
      ignore: '**/password',
    },
  );
} catch (error) {
  console.log(error, '\n', error.stack);
}
