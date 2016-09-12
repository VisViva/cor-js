const webpack_config = require('../webpack/webpack.server.config.js')

module.exports = {
  basePath: '',
  frameworks: ['jasmine', 'chai'],
  files: [
    '../test/**/*.ts'
  ],
  exclude: [
  ],
  preprocessors: {
    '../test/**/*.ts': ['webpack']
  },
  webpack: {
    resolve: webpack_config.resolve,
    module: webpack_config.module
  },
  port: 8090,
  colors: true,
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
}
