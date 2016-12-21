import devMiddleware from './devMiddleware'
import hotMiddleware from './hotMiddleware'

export default {
    devMiddleware,
    hotMiddleware
}

export { default as devMiddleware } from './devMiddleware'
export { default as hotMiddleware } from './hotMiddleware'

//see https://github.com/leecade/koa-webpack-middleware