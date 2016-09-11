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
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
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
