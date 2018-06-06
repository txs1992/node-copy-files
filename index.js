const fs = require('fs')

function getStat (path, callback) {
  fs.stat(path, (err, stats) => {
    if (err) throw err
    callback(stats)
  })
}

function readDir (path, callback, errorHandler) {
  fs.readdir(path, (err, files) => {
    if (err) {
      errorHandler()
    } else {
      callback(files)
    }
  })
}

function mkDir (path, callback) {
  fs.mkdir(path, err => {
    if (err) throw err
    callback()
  })
}

function readAndMkDir (input, output, callback) {
  readDir(output, () => {
    readDir(input, callback)
  }, () => {
    mkDir(output, () => {
      readDir(input, callback)
    })
  })
}

function handleFile (input, output, callback) {
  fs.readFile(input, (err, res) => {
    if (err) throw err
    if (callback) {
      if (typeof callback !== 'function') throw new Error('callback is not function')
      res = callback(res, input, output)
    }
    fs.writeFile(output, res, err => {
      if (err) throw err
    })
  })
}

function visitDirectory (input, output, inputParent, outputParent, callback) {
  const inputPath = inputParent ? inputParent + input : input
  const outputPath = outputParent ? outputParent + output : output
  getStat(inputPath, stats => {
    if (stats.isFile()) {
      handleFile(inputPath, outputPath, callback)
    } else if (stats.isDirectory()) {
      readAndMkDir(inputPath, outputPath, files => {
        files.forEach(file => {
          if (inputParent) {
            visitDirectory(file, file, inputPath + '/', outputPath + '/', callback)
          } else {
            visitDirectory(file, file, input + '/', output + '/', callback)
          }
        })
      })
    }
  })
}

function copyFiles (input, output, callback) {
  const baseInput = /\/$/.test(input)
    ? input.substring(0, input.length - 1)
    : input
  const baseOutput = /\/$/.test(output)
    ? output.substring(0, output.length - 1)
    : output
  visitDirectory(baseInput, baseOutput, '', '', callback)
}

module.exports = copyFiles
