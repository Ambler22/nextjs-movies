const fs = require("fs") // import fs from 'fs'

// fs.readFile("./promise.js", (error, data) => {
//   console.log(data.toString())
// })

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

readFilePromise("./promise.js")
  .then(data => console.log(data.toString()))
  .catch(error => console.error(error))

Promise.reject
