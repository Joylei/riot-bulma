var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var dir_node_modules = path.resolve(__dirname, '../node_modules')
var dir_src = path.resolve(__dirname, '../src')
var dir_app = path.resolve(__dirname, '../src/app')
var dir_dist = path.resolve(__dirname, '../dist')

module.exports = {
    entry: {
        'app': [path.resolve(dir_app, 'app.js')]
    },
    resolve: {
        extensions: ['', '.js', '.html'],
        root:[dir_app],
        fallback: [dir_node_modules],
        alias:{
            'app': dir_app,
            'src': dir_src
        }
    },
    module: {
        preLoaders: [{
            test: /\.(js)$/,
            loader: 'eslint',
            include: dir_src,
            exclude: dir_node_modules
        }, {
            test: /tags\/.*?\.html$/,
            loader: 'riotjs',
            include: dir_src,
            exclude: dir_node_modules,
            query: {
                type: 'es6',
                ext: 'html'
            }
        }],
        loaders: [
            //styles
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }, {
                test: /\.sass$/,
                loader: 'style!css!sass',
            }, {
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /tags\/.*?\.html$/,
                loader: 'babel',
                include: dir_src,
                exclude: dir_node_modules
            }, {
                test: /\.js$/,
                loader: 'babel',
                include: dir_src,
                exclude: dir_node_modules
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'assets/img/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'assets/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot',
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'index.html',
        //     inject: true
        // })
    ],
    stats: {
        colors: true
    },
    devtool: '#eval-source-map', // eval-source-map is faster for development
}