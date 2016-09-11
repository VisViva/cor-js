const webpackConfig = require('./webpack/webpack.server.config.js')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'chai'],
    files: [
      'test/**/*.ts'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*.ts': ['webpack']
    },
    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module
    },
    reporters: ['progress', 'html'],
    htmlReporter: {
      outputDir: 'reports',
      templatePath: null,
      focusOnFailures: true,
      namedFiles: true,
      pageTitle: null,
      urlFriendlyName: false,
      preserveDescribeNesting: false,
      foldAll: false
    },
    port: 8090,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS', 'Chrome', 'Firefox'],
    singleRun: false,
    concurrency: Infinity,
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    options: {
      windowName: 'Core - Tests',
      settings: {
        webSecurityEnabled: false
      }
    }
  })
}
