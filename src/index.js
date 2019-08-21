var fs = require('fs')
var chalk = require('chalk')
var saveComponent = require('./save')
var transform = require('./transform')

module.exports = function (src, options) {
  // read file
  let fileContent = fs.readFileSync(src)
  fileContent = fileContent.toString()

  let [output, result] = transform(fileContent, options);
  // save file
  saveComponent(options.output, output)
  
  // output caveats
  if (result.caveats.length) {
    console.log(chalk.red("Caveats:"));
    console.log(chalk.red(result.caveats.join('\n')))
  }
}