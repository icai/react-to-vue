var fs = require('fs')
var chalk = require('chalk')
var saveComponent = require('./save')
var transform = require('./transform')
var format = require("prettier-eslint");

module.exports = function (src, options) {
  // read file
  let fileContent = fs.readFileSync(src)
  fileContent = fileContent.toString();
  let [output, result] = transform(fileContent, options);
    // format content
  const formatOpt = {
    text: output,
    eslintConfig: {
      parser: 'babel-eslint',
      rules: {
        semi: ["error", "never"],
        quotes: ["error", "single"],
        "no-extra-semi": 2,
        "max-len": ["error", { "code": 150 }],
        "object-curly-spacing": ["error", "never"],
        "space-before-function-paren": ["error", "always"],
        "no-multiple-empty-lines": ["error", { "max": 0}],
        "line-comment-position": ["error", { "position": "beside" }]
      }
    }
  };
  const content = format(formatOpt);
  // save file
  saveComponent(options.output, content)
  // output caveats
  if (result.caveats.length) {
    console.log(chalk.red("Caveats:"));
    console.log(chalk.red(result.caveats.join('\n')))
  }
}