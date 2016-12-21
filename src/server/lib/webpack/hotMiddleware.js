import webpackHotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'

export default function middleware(compiler, options = {}) {
    const middleware = webpackHotMiddleware(compiler, Object.assign({},options))

    function applyMiddleware(context) {
        return (cb) => {
            try {
                console.log('\t-> webpack-hot-middleware')
                const stream = new PassThrough()
                context.body = stream
                middleware(context.req, {
                    write: stream.write.bind(stream),
                    end: ()=> cb(null, true),
                    writeHead: (state, headers) =>{
                        context.state = state
                        context.set(headers)
                    }
                }, ()=>cb(null, false))
            } catch (error) {
                cb(error)
            }
        }
    }

    return function* (next) {
        let handled = yield applyMiddleware(this)
        console.log('\t-> webpack-hot-middleware: ' + handled ? 'handled' : 'skip')
        if(!handled){
            yield next
        }
    }
}