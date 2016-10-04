const webpack = require('webpack');
const webpack_shell_plugin = require('webpack-shell-plugin');
const common = require('./webpack.common.config.js');

common.entry = "./scene_manager.js";

common.preLoaders = [{
    test: /\.js$/,
    loader: "eslint-loader",
    exclude: /node_modules/
}];

common.plugins = [
    new webpack_shell_plugin({
        onBuildStart: [
            'echo "Starting build"'
        ],
        onBuildEnd: [
            'echo "Finishing build"',
            'gulp'
        ]
    }),
    new webpack.optimize.DedupePlugin()
];

module.exports = common;
