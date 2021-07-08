var commons = require('./commons')
var fsPromises = require('fs/promises')

var PARAMETERS_FILE = 'project-parameters.json'

var resolveRelativePath = p => commons.resolvePath(commons.cwd, p)

var validate = p => {
  p.basedir = commons.cwd,
  p.projectName || (p.projectName = 'Android app')
  p.apkName || (p.apkName = 'androidapp')
  p.androidSdkToolsPath || (p.androidSdkToolsPath = resolveRelativePath('sdk'))
  p.androidPlatformToolsPath || (p.androidPlatformToolsPath = resolveRelativePath('platform-tools'))
  p.androidBuildToolsPath || (p.androidBuildToolsPath = resolveRelativePath('build-tool'))
  p.distPath || (p.distPath = resolveRelativePath('dist'))
  p.libPath || (p.libPath = resolveRelativePath('lib'))
  p.codePath || (p.codePath = resolveRelativePath('code'))
  p.jdkPath || (p.jdkPath = process.env.JDK_HOME || process.env.JAVA_HOME || resolveRelativePath('jdk'))
  p.buildDir = resolveRelativePath('build')
  p.javaPath = commons.resolvePath(p.jdkPath, 'bin', 'java')
  p.javacPath = commons.resolvePath(p.jdkPath, 'bin', 'javac')
  p.keytoolPath = commons.resolvePath(p.jdkPath, 'bin', 'keytool')
  p.aaptPath = commons.resolvePath(p.androidBuildToolsPath, 'aapt')
  p.dxPath = commons.resolvePath(p.androidBuildToolsPath, 'dx')
  p.apksignerPath = ''  
  p.zipalignPath = ''
  return p
}

var get = () => fsPromises.readFile(resolveRelativePath(PARAMETERS_FILE))
  .then(data => validate(JSON.parse(data.toString())))
  .catch(e => Promise.reject('Invalid or missing parameters file: ' + resolveRelativePath(PARAMETERS_FILE)))

module.exports = { PARAMETERS_FILE, get }

