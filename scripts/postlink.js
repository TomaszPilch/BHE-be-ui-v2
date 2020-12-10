const { exec } = require('child_process')

const runCommand = (cmd) => {
  exec(cmd, (e, stdout, stderr) => {
    console.log(e)
    console.log(stdout)
    console.log(stderr)
  })
}

runCommand('cd node_modules/react & yarn unlink')
runCommand('cd node_modules/react-redux & yarn unlink')
runCommand('cd node_modules/next & yarn unlink')
