var merge = require('webpack-merge')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var AssetsPlugin = require('assets-webpack-plugin')

var config = require('./webpack.config')
var dir_dist = path.resolve(__dirname, '../dist')
module.exports = merge(config, {
    devtool: '#source-map',
    output: {
        path: dir_dist,
        publicPath:'assets/',
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'production'
        }), new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // extract css into its own file
        new ExtractTextPlugin('assets/css/[name].[contenthash].css'),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new AssetsPlugin({
            filename: 'webpack-assets.json',
            //includeManifest: 'manifest',
            path: dir_dist
        })
    ]
})