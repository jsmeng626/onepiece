const { readFile, writeFile } = require('fs')

function getReadFile(filename) {
  return new Promise((resolve, reject) => {
    readFile(filename, 'utf-8', (err, data) => {
      if (!err) {
        resolve(JSON.parse(data))
      } else {
        reject(err)
      }
    })
  })
}

function getWriteFile(filename, content) {
  return new Promise((resolve, reject) => {
    writeFile(filename, JSON.stringify(content), (err) => {
      if (!err) {
        resolve(undefined)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = {
  getReadFile, getWriteFile
}