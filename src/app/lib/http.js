import {isFunction, isObject, isUndefined} from '../../shared/util'

function param(obj){
    const items = []
    Object.keys(obj).forEach((key)=>{
        let val = obj[key]
        if(val === null || isUndefined(val)) return
        items.push(encodeURIComponent(key) + '=' + encodeURIComponent(val))
    })
    return items.join('&')
}

/**
 * overloads
 * - http(url) //http get request
 * - http(url, done) //http get request
 * - http(url, method) //http request with specified method
 * - http(url, method, done) //http request with specified method
 * - http(url, method, data) //http request with specified method and data
 * - http(url, method, data, done) //http request with specified method and data
 * - http({url, method, data, headers, timeout, done}) //
 */
export function http(url, method, data, done) {
    let req
    if(isObject(url)){
        req = url
    }else{
        req = {}
        req.url = url
        if (isFunction(method)) {
            req.done = method
        } else if(isFunction(data)) {
            req.done = data
            req.method = method
        }else if(isFunction(done)){
            req.done = done
            req.method = method
            req.data = data
        }
    }
    if(!req.url) return
    req.method = (req.method || 'GET').toUpperCase()
    if(req.method === 'GET' && req.data){
        if(/\?/.test(req.url)){
            req.url += '&' + param(req.data)
        }else{
            req.url += '?' + param(req.data)
        }
    }

    let isCompleted = false
    function complete(err, data){
        if(isCompleted){
            return
        }
        isCompleted = true
        
        try{
            if(isFunction(req.done)){
                req.done.call(xhr,err,data)
            }
        }finally{
            if(isFunction(http.oncomplete)){
                http.oncomplete.call(this)
            }
        }
    }

    var xhr = new XMLHttpRequest()
    xhr.timeout = req.timeout || 120 * 1000
    xhr.ontimeout = ()=> complete(new Error('request timeout'))
    xhr.open(req.method, req.url, true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            complete(null)
        }
    }

    if(req.headers){
        Object.keys(req.headers).forEach(key =>{
            xhr.setRequestHeader(key, req.headers[key])
        })
    }

    if(isFunction(http.onstart)){
        http.onstart.call(this)
    }

    xhr.send(req.method === 'GET' ? null : req.data)

    let isCancelled = false
    return {
        cancel(){
            if(isCompleted || isCancelled) return
            isCancelled = true
            xhr.abort()
            complete(new Error('request aborted'))
        },
        get completed(){
            return isCompleted
        },
        get cancelled(){
            return isCancelled
        }
    }
}

http.get = function(url, data, done){
    return http(url, 'GET', data, done)
}

http.post = function(url, data, done){
    return http(url, 'POST', data, done)
}

http.put = function(url, data, done){
    return http(url, 'PUT', data, done)
}

http.delete = function(url, data, done){
    return http(url, 'DELETE', data, done)
}

//http.onstart = function(){}
//http.oncomplete = function(){}
export default http

/**
 * @param {string} baseUrl
 * @param {(baseUrl:string, id:any, action:string) => {url:string, method?:='GET',data?:any, before?: (done,err,data)=>void}} buildRequest
 * @export
 */
export function resource(baseUrl = './', buildRequest){
    const rootUrl = baseUrl[baseUrl.length-1] === '/' 
        ? baseUrl
        : baseUrl + '/'
    const fn = buildRequest || ((rootUrl, id, action) => {
        let before = null
        if(action === 'remove'){
            before = function(done, err, data){
                if(err) return done(err)
                if(this.status !== 200) {
                    return done(new Error('http error: ' + this.status + '\n' + this.statusText))
                }
                done(null, data)
            }
        }
        let url = rootUrl
        if(id) url += id
        return {url, before}
    })
    
    function parseJSON(xhr, err, done){
        if(err) return done(err)
        if(xhr.status !== 200) {
            return done(new Error('http error: ' + xhr.status + '\n' + xhr.statusText))
        }
        try{
            let text = xhr.responseText
            if(text){
                done(null,JSON.parse(text))
            }else{
                done(null, null)
            }
        }catch(error){
            done(error)
        }
    }

    function makeRequest({action, done, data, id, method = 'GET'}){
        let req = fn(rootUrl, id, action)
        req.method = req.method || method
        req.data = data
        delete req.done
        if(req.before){
            req.done = req.before.bind(done) 
        }else{
            req.done = function (err) {
                parseJSON(this, err, done)
            }
        }
        return http(req)
    }

    return {
        items(filter, done){
            return makeRequest({action: 'items', done, data: filter})
        },
        get(id, done){
            return makeRequest({action: 'get', done, id})
        },
        add(data, done){
            return makeRequest({action: 'add', done, method: 'PUT'})
        },
        update(id, data, done){
            return makeRequest({action: 'update', done, data, id, method: 'POST'})
        },
        remove(id, done){
            return makeRequest({action: 'remove', done, id, method: 'DELETE'})
        }
    }
}