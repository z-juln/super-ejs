const ejs = require('ejs');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const gerenateDir = (
  cwd,
  tplDir,
  data,
  options,
) => {
  cwd = path.resolve(cwd);
  tplDir = path.resolve(tplDir);

  return new Promise((resolve, reject) => {
    glob('**', { nodir: true, cwd: tplDir }, function (err, files) {
      if (err) {
        reject(err);
        return;
      }

      const getOutPath = (filePath) => {
        let relativePath = filePath.slice(tplDir.length);
        if (relativePath.startsWith('/')) {
          relativePath = relativePath.slice(1);
        }
        return path.resolve(cwd, relativePath);
      };

      Promise.all(
        files.map(filePath => path.resolve(tplDir, filePath))
          .map(tplFilePath => {
            return ejs.renderFile(tplFilePath, data, options).then(content => {
              const outFilePath = getOutPath(tplFilePath);
              fs.ensureFileSync(outFilePath);
              return fs.writeFile(outFilePath, content);
            });
        })
      ).then(resolve, reject);
    });
  });
};

exports.gerenateDir = gerenateDir;

module.exports = {
  ...ejs,
  gerenateDir,
};
