var tasks = require('../tasks')

var caseInfo = () => tasks.info().then(d => console.log('Info: \n', d, '\n'))

Promise.all([caseInfo()])
  .then(() => console.log('OK\n'))
  .catch(e => console.error('ERROR:\n', e))
