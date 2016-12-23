import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import webpackConfig from '../../../config/webpack.config.dev'
import webpack from 'webpack'

module.exports = function(app){
    const compiler = webpack(webpackConfig)
    app.use(devMiddleware(compiler, {
        noInfo: false,
        quiet: false,
        lazy: false, //true means no watching, but recompilation on every request
        watchOptions:{
            aggregateTimeout: 300,
            pool: true
        },
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true, chunks: false }
    }))
    app.use(hotMiddleware(compiler))
}