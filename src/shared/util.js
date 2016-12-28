export function isUndefined(obj){
    return typeof obj === 'undefined'
}

export function isNull(obj){
    return obj === null
}

export function isFunction(obj){
    return typeof obj === 'function'
}

export function isString(obj){
    return typeof obj === 'string'
}

export function isArray(obj){
    return Array.isArray(obj) || obj instanceof Array
}

const toString = Object.prototype.toString
export function isObject(obj){
    return toString.call(obj) === '[object Object]'
}

const Empty_Array = []

export function arrayify(obj, start, end){
    return Empty_Array.slice.call(obj, start, end)
}

export function extend(dest, src){
    for(let key in src){
        dest[key] = src[key]
    }
    return dest
}

export function clone(src){
    return extend({}, src)
}

export function noop(){}

/**
   * delay function call until there is no more invocation;
   * taken from https://remysharp.com/2010/07/21/throttling-function-calls
   * @param  {Function} fn    [description]
   * @param  {number}   delay [description]
   * @param  {any}      scope [description]
   * @return {Function}       [description]
   */
export function debounce(fn, delay, scope) {
    let timer
    return function(...args) {
        let context = scope || this
        clearTimeout(timer)
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}