var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');

var root = __dirname + '/../';

module.exports = {
  watch: true,
  context: root + "/src",
  entry: "./core.ts",
  output: {
    path: root + "/dist",
    filename: "core.js",
    libraryTarget: "var",
    library: "core"
  },
  devtool: "eval-source-map",
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint"
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: "babel-loader?presets[]=es2015!ts-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Core - Playground'
    }),
    new WebpackShellPlugin({
      onBuildStart: [
        'echo "Starting build"'
      ],
      onBuildEnd: [
        'echo "Finishing build"',
        'tsc --out dist/temp_core.js --declaration ./src/core.ts' +
        '&& rm dist/temp_core.js' +
        '&& mv dist/temp_core.d.ts dist/core.d.ts'
      ]
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      minimize: true,
      sourceMap: false
    })
  ],
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
  }
};
