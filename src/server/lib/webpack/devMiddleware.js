import webpackDevMiddleware from 'webpack-dev-middleware'

const stats = {
    chunkModules: false,
    colors: 'debug' != process.env.NODE_ENV
}

export default function middleware(compiler, options = {}) {
    const {
        publicPath
    } = compiler.options.output
    const defaults = options.publicPath ? options : {
        publicPath,
        stats
    }
    const middleware = webpackDevMiddleware(compiler, Object.assign({}, defaults, options))

    function applyMiddleware(context) {
        return (cb) => {
            try {
                console.log('-> webpack-dev-middleware')
                middleware(context.req, {
                    end: (content) => {
                        context.body = content
                        cb(null, true)
                    },
                    setHeader:(name,value) => context.headers[name] = value
                }, ()=> cb(null, false))
            } catch (error) {
                cb(error)
            }
        }
    }

    return function* (next) {
        let handled = yield applyMiddleware(this)
        console.log('-> webpack-dev-middleware: ' + handled ? 'handled' : 'skip')
        if(!handled){
            yield next
        }
    }
}