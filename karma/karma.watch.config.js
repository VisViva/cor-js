const common = require('./karma.common.config.js')

common.reporters = ['progress'];
common.autoWatch = true,
common.singleRun = false,

module.exports = function (config) {
  config.set(common);
}
