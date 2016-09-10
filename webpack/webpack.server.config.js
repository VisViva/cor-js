const webpack = require('webpack');
const html_webpack_plugin = require('html-webpack-plugin');
const common = require('./webpack.common.config.js');

common.devtool = "eval-source-map";
common.preLoaders = [
  {
    test: /\.ts$/,
    loader: "tslint"
  }
];
common.plugins = [
  new html_webpack_plugin({
    title: 'Core - Playground'
  })
];

module.exports = common;
