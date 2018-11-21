const fs = require('fs');
const path = require('path');
const loaderUtils = require("loader-utils");

const judgeFileExist = (currentPath) => {
  return new Promise((resolve, reject) => {
    fs.exists(currentPath, function (exists) {
      resolve(exists)
    });
  })
}

module.exports = function (content) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this) || {};
  const defaultSassFileName = 'vars.scss'

  let recoverScssFile
  if (!options.loadCoverSassFile) {
    return content;
  } else {
    recoverScssFile = options.loadCoverSassFile();
  }

  if (!recoverScssFile) {
    return content;
  }

  const sassFileName = options.sassFile || defaultSassFileName;
  const sassMatchStr = `@import '${sassFileName}';\n`
  const start = content.search(sassMatchStr)

  if (start === -1) {
    return content;
  }

  judgeFileExist(recoverScssFile).then(res => {
    const result = res
      ? content.replace(sassMatchStr, sassMatchStr+`@import '${recoverScssFile}';\n`)
      : content;
    callback(null, result);
  })
 }