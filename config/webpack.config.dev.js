var merge = require('webpack-merge')
var config = require('./webpack.config')
var webpack = require('webpack')
var path = require('path')

var dir_app = path.resolve(__dirname, '../src/app')
var dir_dist = path.resolve(__dirname, '../dist')
module.exports = merge(config, {
    entry: {
        'app': [
            // For old browsers
            'eventsource-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&'
                +'reload=true&noInfo=false&quiet=false',
            path.resolve(dir_app, 'app.js')
        ]
    },
    output: {
        path: dir_dist,
        publicPath: '/assets/', //for hot
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'development'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})