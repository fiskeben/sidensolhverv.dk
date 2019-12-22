const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve('./app'),
    entry: "./app.js",
    output: {
        path: path.resolve('./public'),
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './img/**/*',
                to: './'
            },
            {
                from: './css/**/*',
                to: './'
            },
            {
                from: './index.html',
                to: './'
            }
        ])
    ]
}
