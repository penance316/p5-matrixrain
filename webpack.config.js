var HtmlWebpackPlugin = require('html-webpack-plugin');


const path = require('path');
module.exports = {
    entry: './sketch.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'head'
    })],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};