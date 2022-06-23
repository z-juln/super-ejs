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
      parseFilename: (original) => original.replace('__name__', name),
      ignore: '**/password',
      debug: true,
    },
  );
} catch (error) {
  console.log(error, '\n', error.stack);
}
