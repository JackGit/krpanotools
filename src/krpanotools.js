var spawn = require('child_process').spawn;
var config = {
  krpanotoolsPath: './krpanotools'
};

/**
 * description: make a preview of a sphere image
 * example:
 *    makePreview('./test.jpg', '-cs')
 */
function makePreview (inputFile, options, onSuccess, onError) {
  var cmd = spawn(config.krpanotoolsPath, ['makepreview', inputFile].concat(options || ['-cs']));
  cmd.on('close', function (code) {
    if (code === 0) {
      var previewPath = inputFile.substring(0, inputFile.lastIndexOf('.')) + '_preview.jpg';
      onSuccess && onSuccess(previewPath);
    } else {
      console.warn('makePreview exits with error, exit code is ' + code);
      onError && onError(code);
    }
  });
}

/**
 * description: make a sphere image into tiles
 * example:
 *    makeTiles('./bigimage.jpg', 'tiles_%v_%h.jpg', 512)
 */
function makeTiles (inputFile, outputFile, tileSize, options, onSuccess, onError) {
  var cmd = spawn(config.krpanotoolsPath, ['maketiles', inputFile, outputFile, tileSize].concat(options || []));
  cmd.on('close', function (code) {
    if (code === 0) {
      onSuccess && onSuccess();
    } else {
      console.warn('makeTiles exits with error, exit code is ' + code);
      onError && onError(code);
    }
  });
}

module.exports = {
  config: config,
  makePreview: makePreview,
  makeTiles: makeTiles
};
