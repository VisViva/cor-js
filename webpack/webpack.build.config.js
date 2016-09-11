const webpack = require('webpack');
const webpack_shell_plugin = require('webpack-shell-plugin');
const common = require('./webpack.common.config.js');

common.devtool = "source-map";

common.preLoaders = [
  {
    test: /\.ts$/,
    loader: "tslint"
  }
];

common.plugins = [
  new webpack_shell_plugin({
    onBuildStart: [
      'echo "Starting build"'
    ],
    onBuildEnd: [
      'echo "Finishing build"',
      'tsc --out dist/temp_core.js --declaration ./src/core.ts' +
      '&& rm dist/temp_core.js' +
      '&& mv dist/temp_core.d.ts dist/core.d.ts'
    ],
    onBuildEnd: [
      'gulp'
    ]
  }),
  new webpack.optimize.DedupePlugin()
];

module.exports = common;
