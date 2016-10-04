const common = require('./webpack.common.config.js');

common.module.postLoaders = [{
    test: /\.js$/,
    exclude: /(test|node_modules)/,
    loader: 'istanbul-instrumenter',
    query: {
        esModules: true
    }
}];

module.exports = common;
