import nprogress from './lib/nprogress'
import route from 'riot-route'
import {
    isString, isFunction,
    noop
} from '../shared/util'

export const DEFAULT_TITLE = 'riot-bulma'
const DEFAULT_PAGE = 'home'

/**
 * simple mapping:
 *  home => home
 * 
 * with parameters:
 *  user/:id/:action => {page:'home',
 *       query: function(id,action){
 *          return { id,action}
 *      }, title:function(tag){
 *      return tag.query.action + ''
 *  }}
 * 
 * see riot-route for more routing info
 * 
 * title can be a string or function
 */
const routeTable = {
    '/': 'home',
    '/home': 'home',
    '/404': '404',
    '/about': 'about',
    '/ajax': 'ajax',
    '/buttons': 'buttons',
    '/card': 'card',
    '/charts':'charts',
    '/collapse': 'collapse',
    '/content': 'content',
    '/form': 'form',
    '/icons': 'icons',
    '/image': 'image',
    '/level': 'level',
    '/login': 'login',
    '/mediaobject': 'mediaobject',
    '/message': 'message',
    '/modal': 'modal',
    '/nav': 'nav',
    '/notifications': 'notifications',
    '/pagination': 'pagination',
    '/panel': 'panel',
    '/progress': 'progress',
    '/rating': 'rating',
    '/table': 'table',
    '/tabs': 'tabs',
    '/tags': 'tags',
    '/timeline': 'timeline',
    '/title': 'title',
    '/toast': 'toast'
}

export default function setupRoute(onRouteRequested, baseUrl = '#!') {
    if (baseUrl) {
        route.base(baseUrl)
    }
    //setup routes
    Object.keys(routeTable).forEach(path => {
        const meta = routeTable[path] || {}
        const conf = isString(meta) ? {
            page: meta
        } : meta
        conf.page = conf.page || DEFAULT_PAGE
        conf.title = conf.title || DEFAULT_TITLE
        const query = conf.query || noop
        route(path, (...args) => {
            nprogress.trigger('page-loading')
            try{
                const result = query.apply(null, args) || {}
                let tag = onRouteRequested(conf, result)
                //update title
                console.log(tag)
                window.document.title = (isFunction(conf.title) ? conf.title(tag) : conf.title) || DEFAULT_TITLE
            }finally{
                nprogress.trigger('page-loaded')
            }
        })
    })
    route(() => {
        console.log('unresolved url', window.location.href)
        route('/404') //404
    })
    route.start(true)

    return () => route.stop()
}