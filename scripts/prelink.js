const { exec } = require('child_process')

const runCommand = (cmd) => {
  exec(cmd, (e, stdout, stderr) => {
    console.log(e)
    console.log(stdout)
    console.log(stderr)
  })
}

runCommand('cd node_modules/react & yarn link')
runCommand('cd node_modules/react-redux & yarn link')
runCommand('cd node_modules/next & yarn link')
runCommand('cd node_modules/@fluentui/react & yarn link')
runCommand('cd node_modules/@uifabric/experiments & yarn link')
runCommand('cd node_modules/office-ui-fabric-core & yarn link')
runCommand('cd node_modules/office-ui-fabric-react & yarn link')
runCommand('cd node_modules/react & yarn link')
runCommand('cd node_modules/react-dom & yarn link')
