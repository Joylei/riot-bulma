import path from 'path'

import koa from 'koa'
import logger from 'koa-logger'
import serve from 'koa-static'
import route from 'koa-route'
import mount from 'koa-mount'
import render from './lib/render'

const app = koa()

app.use(logger())


app.use(route.get('/', home))

function *home(){
    //yield next
    this.body = yield render('home')
}

if(process.env.NODE_ENV !== 'production'){
    //use require to make it conditional
    require('./lib/webpack')(app)
}else{
    app.use(mount('/assets', serve(path.join(__dirname, '../../dist'))))
}

const port = process.env.PORT || 3000
app.listen(port)
console.log(`listening on port ${port}...`)