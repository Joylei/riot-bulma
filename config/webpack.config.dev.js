var merge = require('webpack-merge')
var config = require('./webpack.config')
var webpack = require('webpack')
var path = require('path')

var dir_app = path.resolve(__dirname, '../src/app')
var dir_dist = path.resolve(__dirname, '../dist')
module.exports = merge(config, {
    entry: {
        'app': ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&'
            +'reload=true&noInfo=false&quiet=false']
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