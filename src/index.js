// @ts-check

const ejs = require('ejs');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
/** @type {(fd: string, cb?: () => void) => (boolean | void)} */
// @ts-ignore
const checkIsDir = require('isdir');
const { isBinaryFile } = require('isbinaryfile');

/** @type {(...args: string[]) => void} */
let log = () => {};

  /** @returns {Promise<void>} */
const gerenateDir = (
  cwd,
  tplDir,
  data,
  /** @type {import('ejs').Options} */
  options,
  superEjsOpts,
) => {
  const { ignore, parseFilename: optParseDest = false, debug = false } = superEjsOpts || {};

  if (debug) {
    log = (...args) => console.log('\x1B[33m', 'super-ejs debug: ', '\x1B[0m', ...args);
  }

  cwd = path.resolve(cwd);
  tplDir = path.resolve(tplDir);

  return new Promise((resolve, reject) => {
    glob('**', { cwd: tplDir, ignore, dot: true }, function (err, _files) {      
      if (err) {
        reject(err);
        return;
      }

      /** @returns {Promise<void>} */
      const parseSingle = async (/** @type {string} */ relativeTplPath) => {
        const fullTplPath = path.resolve(tplDir, relativeTplPath);
        const isdir = checkIsDir(fullTplPath);
        const outputPath = path.resolve(cwd, relativeTplPath);

        log('outputPath: ', isdir ? 'dir' : 'file', outputPath, ' from: ', fullTplPath);

        if (isdir) {
          fs.ensureDirSync(outputPath);
        } else {
          if (await isBinaryFile(fullTplPath)) return;

          fs.ensureFileSync(outputPath);
          log('gerenateFileContent: ', outputPath, ' from: ', fullTplPath);
          await gerenateFileContent(outputPath, fullTplPath, data, options);
        }

        if (optParseDest) {
          await updateFileOrDirName(outputPath, data, options, optParseDest);
        }
        // isdir
        //   ? fs.ensureDirSync(outputPath)
        //   : fs.ensureFileSync(outputPath);

        // await gerenateFileContent(outputPath, fullTplPath, data, options);

        // if (optParseDest) {
        //   await updateFileOrDirName(outputPath, data, options, optParseDest);
        // }
      };

      /** @returns {Promise<any>} */
      const parseSingleWithError = (/** @type {string} */ p) =>
        parseSingle(p).catch((error) => error);

      Promise.all(
        _files.map(parseSingleWithError)
      )
        .then((errorList) => {
          const hasError = errorList.every(Boolean);
          if (hasError) {
            reject(errorList);
            return;
          }
          resolve();
        })
        .catch(reject);
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

  if (originalPath !== dest) {
    log('updateFileOrDirName: ', dest, ' from: ', originalPath);
    await fs.move(originalPath, dest);
  }
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
