const common = require('./karma.common.config.js')

common.reporters = ['progress', 'html'];

common.htmlReporter = {
  outputDir: 'reports',
  templatePath: null,
  focusOnFailures: true,
  namedFiles: true,
  pageTitle: null,
  urlFriendlyName: false,
  preserveDescribeNesting: false,
  foldAll: false
},

common.autoWatch = false,
common.singleRun = true,

module.exports = function (config) {
  config.set(common)
}
