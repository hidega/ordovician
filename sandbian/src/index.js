var commons = require('./commons')
var info = require('./info')
var clean = require('./clean')
var build = require('./build')
var buildJava = require('./build-java')
var test = require('./test')
var smoketest = require('./smoketest')
var help = require('./help')
var precheck = require('./precheck.js')
var {PARAMETERS_FILE} = require('./project-parameters')

var tasks = {
  clean: () => precheck().then(clean),
  build: () => precheck().then(build),
  cleanBuild: () => precheck().then(clean).then(build),
  buildJava: () => precheck().then(buildJava), 
  info: () => precheck().then(info),
  help,
  test: () => precheck().then(test),
  smoketest: () => precheck().then(smoketest),
  PARAMETERS_FILE
}

module.exports = tasks

