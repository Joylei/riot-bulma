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
        extensions: ['.js', '.html'],
        alias: {
            'app': dir_app,
            'src': dir_src
        },
        modules: [dir_app, 'node_modules']
    },
    module: {
        loaders: [
            //styles
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.sass$/,
                loader: 'style-loader!css-loader!sass-loader',
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /tags\/.*?\.html$/,
                loader: 'babel-loader!riot-tag-loader?type=es6&ext=html',
                include: dir_src,
                exclude: dir_node_modules
            }, {
                test: /\.js$/,
                loader: 'babel-loader!eslint-loader',
                include: dir_src,
                exclude: dir_node_modules
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'assets/img/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
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
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'index.html',
        //     inject: true
        // }),
    ],
    stats: {
        colors: true
    },
    devtool: '#eval-source-map', // eval-source-map is faster for development
}