const yaml = require('js-yaml')
const fs = require('fs')

let theme = {}

try {
  // NOTE: this path is relative out of dependent package
  const packagePath = 'node_modules/orient-ui-library'
  theme = yaml.load(fs.readFileSync(`${packagePath}/config/theme.yaml`))
} catch (e) {
  console.error('Error reading portal theme', e)
}

module.exports = {
  javascriptEnabled: true,
  modifyVars: theme,
}
