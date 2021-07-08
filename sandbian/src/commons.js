var path = require('path')
var fsPromises = require('fs/promises')

var cwd = process.cwd()

var commons = {
  cwd,
  throwError: e => { throw new Error(e) },
  resolvePath: path.resolve,
  mkDir: fsPromises.mkdir,
  rmDir: d => fsPromises.rm(d, { recursive: true, force: true }),
  exitError: (e, n) => {
    console.error(e, '\n')
    process.exit(n || 127)
  }
}

module.exports = commons
