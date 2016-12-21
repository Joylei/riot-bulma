import path from 'path'

import koa from 'koa'
import logger from 'koa-logger'
import serve from 'koa-static'
import route from 'koa-route'
import mount from 'koa-mount'

import render from './lib/render'
import { devMiddleware, hotMiddleware } from './lib/webpack'
import webpackConfig from '../../config/webpack.config.dev'
import webpack from 'webpack'

const app = koa()

app.use(logger())

app.use(route.get('/', home))

function *home(){
    //yield next
    this.body = yield render('home')
}

if(process.env.NODE_ENV !== 'production'){
    const compiler = webpack(webpackConfig)
    app.use(devMiddleware(compiler, {
        noInfo: false,
        quiet: false,
        lazy: false, //means no watching, but recompilation on every request
        watchOptions:{
            aggregateTimeout: 300,
            pool: true
        },
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true, chunks: false }
    }))
    app.use(hotMiddleware(compiler))
}else{
    app.use(mount('/assets', serve(path.join(__dirname, '../../dist'))))
}

const port = process.env.PORT || 3000
app.listen(port)
console.log(`listening on port ${port}...`)