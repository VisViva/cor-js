const common = require('./karma.common.config.js')

common.reporters = ['progress', 'html', 'coverage'];
common.browsers = ['PhantomJS', 'Chrome', 'Firefox'];
common.autoWatch = false;
common.singleRun = true;

common.htmlReporter = {
    outputDir: 'reports',
    templatePath: null,
    focusOnFailures: true,
    namedFiles: true,
    pageTitle: null,
    urlFriendlyName: false,
    preserveDescribeNesting: false,
    foldAll: false
};

common.coverageReporter = {
    reporters: [{
        type: 'html',
        dir: __dirname + '/../coverage/'
    }, {
        type: 'text-summary'
    }, {
        type: 'text'
    }]
};

module.exports = function(config) {
    config.set(common)
};
