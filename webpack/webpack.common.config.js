var root = __dirname + '/../';

module.exports = {
    context: root + "/src",
    entry: "./scene.manager.js",
    output: {
        path: root + "/dist",
        filename: "scene.manager.js",
        libraryTarget: "var",
        library: "scenemanager"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel-loader?presets[]=es2015!eslint-loader"
        }]
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js"],
        alias: {
            'gl-matrix': __dirname + '/../node_modules/gl-matrix/dist/gl-matrix.js',
        }
    }
};
