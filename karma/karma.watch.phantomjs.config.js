const common = require('./karma.common.config.js')

common.reporters = ['progress', 'coverage'];
common.browsers = ['PhantomJS'];
common.autoWatch = true;
common.singleRun = false;

common.coverageReporter = {
  type: 'text'
};

module.exports = function(config) {
    config.set(common);
};
