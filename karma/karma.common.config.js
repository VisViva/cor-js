const webpack_config = require('../webpack/webpack.server.config.js')

module.exports = {
    basePath: '',
    frameworks: ['jasmine', 'sinon', 'chai'],
    files: [
        '../test/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
        '../test/**/*.spec.js': ['webpack']
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
        windowName: 'Scene Manager - Tests',
        settings: {
            webSecurityEnabled: false
        }
    }
};
