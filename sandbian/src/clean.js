var parameters = require('./project-parameters')
var commons = require('./commons')

module.exports = () => parameters.get()
  .then(parameters => commons.rmDir(parameters.buildDir)
    .then(() => commons.rmDir(parameters.distPath))
    .then(() => commons.mkDir(parameters.buildDir))
    .then(() => commons.mkDir(parameters.distPath)))
