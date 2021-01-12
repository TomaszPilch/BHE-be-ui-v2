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
runCommand('cd node_modules/@fluentui/react & yarn unlink')
runCommand('cd node_modules/@uifabric/experiments & yarn unlink')
runCommand('cd node_modules/office-ui-fabric-core & yarn unlink')
runCommand('cd node_modules/office-ui-fabric-react & yarn unlink')
runCommand('cd node_modules/react & yarn unlink')
runCommand('cd node_modules/react-dom & yarn unlink')
