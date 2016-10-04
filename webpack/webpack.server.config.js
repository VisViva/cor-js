const webpack = require('webpack');
const html_webpack_plugin = require('html-webpack-plugin');
const common = require('./webpack.common.config.js');

common.entry = "../samples/{{sample}}.js";
common.devtool = "eval-source-map";

common.preLoaders = [{
    test: /\.js$/,
    loader: "eslint-loader",
    exclude: /node_modules/
}];

common.plugins = [
    new html_webpack_plugin({
        title: 'Scene Manager - Playground'
    })
];

module.exports = common;
