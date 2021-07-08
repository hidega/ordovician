var tasks = require('./src')

var cmd = process.argv[2]

if(Object.keys(tasks).includes(cmd)) {
  tasks[cmd]().then(() => {
    console.log('OK')
    process.exit(0)
  }).catch(e => {
    console.error('ERROR: ', e)
    process.exit(254)
  })
} else {
  console.error('ERROR: Unrecognized command: ' + cmd)
  process.exit(255)
}

