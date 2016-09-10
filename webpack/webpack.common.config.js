var root = __dirname + '/../';

module.exports = {
  context: root + "/src",
  entry: "./core.ts",
  output: {
    path: root + "/dist",
    filename: "core.js",
    libraryTarget: "var",
    library: "core"
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: "babel-loader?presets[]=es2015!ts-loader"
      }
    ]
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
  }
};
