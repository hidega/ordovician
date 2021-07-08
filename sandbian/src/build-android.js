var execCmd = require('./exec-cmd')
var parameters = require('./project-parameters')
var commons = require('./commons')

var CLASSES_DEX = 'classes.dex'
var UNALIGNED_APK = '.unaligned.apk'

var dxTask = (p, env) => {
  var args = [
    '--dex',
    '--output', commons.resolvePath(p.codePath, CLASSES_DEX),
    p.libPath + commons.pathSeparator + '*.jar',
    p.objPath 
  ]
  return execCmd(p.dxPath, args, env) 
}

/*
./aapt package -f -m -F $PROJ/bin/hello.unaligned.apk -M $PROJ/AndroidManifest.xml -S $PROJ/res -I /opt/android-sdk/platforms/android-19/android.jar
cp $PROJ/bin/classes.dex .
./aapt add $PROJ/bin/hello.unaligned.apk classes.dex
*/

var packageTask = (p, env) => {
  var args = [
    'package',
    '-f',
    '-m',
    '-F', commons.resolvePath(p.distPath, p.apkName + UNALIGNED_APK),
    '-M', commons.resolvePath(p.codePath, 'AndroidManifest.xml'),
    '-S', p.resPath,
    '-I', p.androidJarPath
  ]
  return execCmd(p.aaptPath, args, env) 
}

var copyTask = p => commons.copyFile(commons.resolvePath(p.distPath, CLASSES_DEX), commons.resolvePath(p.codePath, CLASSES_DEX))

var addTask = (p, env) => Promise.resolve(0)

var signTask = (p, env) => Promise.resolve(0)

var alignTask = (p, env) => Promise.resolve(0)

module.exports = () => parameters.get()
  .then((p, env = { JAVA_HOME: p.jdkPath }) => dxTask(p, env)
    .then(() => packageTask(p, env))
    .then(() => copyTask(p))
    .then(() => addTask(p, env))
    .then(() => signTask(p, env)
    .then(() => alignTask(p, env))))

