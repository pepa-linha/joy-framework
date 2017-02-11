var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CircularDependencyPlugin = require("circular-dependency-plugin");
var extractCSS = new ExtractTextPlugin("[name].css");

module.exports = {
    devServer: {
        inline: true
    },
    context: __dirname + "/src",
    entry: __dirname + "/src/App/bootstrap.ts",
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: ["ts-loader"],
                exclude: "node_modules"
            },
            {
                test: /\.sass$/,
                loader: extractCSS.extract({
                    fallback: "style-loader",
                    loader: ["css-loader", "sass-loader"],
                }),
                exclude: "node_modules"
            }
        ]
    },
    plugins: [
        new CircularDependencyPlugin({
            failOnError: true
        }),
        extractCSS,
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".ts", ".sass"]
    },
    output: {
        path: path.join(__dirname, "public", "built"),
        publicPath: "/public/built/",
        filename: "bundle.js"
    }
};