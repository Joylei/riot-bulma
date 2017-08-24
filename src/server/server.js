import path from 'path'
import fs from 'fs'

import koa from 'koa'
import logger from 'koa-logger'
import serve from 'koa-static'
import route from 'koa-route'
import mount from 'koa-mount'
import render from './lib/render'

const app = new koa()

app.use(logger())


app.use(route.get('/', home))

let bundles
if(process.env.NODE_ENV !== 'production'){
    bundles = ['./assets/bundle.js']
}else{
    let file = path.resolve(__dirname, '../../dist/webpack-assets.json')
    let text = fs.readFileSync(file)
    let data = JSON.parse(text)
    bundles = Object.keys(data).map(key =>{
        return data[key].js
    })
}
async function home(){
    //yield next
    this.body = await render('home', {bundles})
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