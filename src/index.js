const ejs = require('ejs');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const gerenateDir = (
  cwd,
  tplDir,
  data,
  /** @type {import('ejs').Options} */
  options,
  superEjsOpts,
) => {
  const { ignore, parseFilename: optParseDest = false } = superEjsOpts || {};

  cwd = path.resolve(cwd);
  tplDir = path.resolve(tplDir);

  return new Promise((resolve, reject) => {
    glob('**', { cwd: tplDir, ignore }, function (err, _files) {      
      if (err) {
        reject(err);
        return;
      }

      const parseSingle = async (relativeTplPath) => {
        const fullTplPath = path.resolve(tplDir, relativeTplPath);
        const isdir = require('isdir')(fullTplPath);
        const outputPath = path.resolve(cwd, relativeTplPath);

        isdir
          ? fs.ensureDirSync(outputPath)
          : fs.ensureFileSync(outputPath);

        await gerenateFileContent(outputPath, fullTplPath, data, options);

        if (optParseDest) {
          await updateFileOrDirName(outputPath, data, options, optParseDest);
        }
      }

      Promise.all(
        _files.map(parseSingle)
      ).then(() => resolve(), reject);
    });
  });
};

exports.gerenateDir = gerenateDir;

module.exports = {
  ...ejs,
  gerenateDir,
};

/** @return {Promise<void>} */
async function updateFileOrDirName(
  originalPath,
  data,
  options,
  optParseDest
) {
  let dest;
  if (optParseDest === true) {
    dest = ejs.render(originalPath, data, options);
  } else if (optParseDest instanceof Function) {
    dest = optParseDest(originalPath);
  }
  await fs.move(originalPath, dest);
}

/** @return {Promise<void>} */
function gerenateFileContent(
  outputPath,
  tplPath,
  data,
  options,
) {
  return ejs.renderFile(tplPath, data, options).then(content => {
    return fs.writeFile(outputPath, content);
  });
}
