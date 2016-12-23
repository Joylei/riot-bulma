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
 * - http({url, method, data, headers, done}) //
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
    req.method = req.method || 'GET'
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
    return ()=>{
        xhr.abort()
        complete(new Error('request aborted'))
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

export function resource(baseUrl = ''){
    const rootUrl = baseUrl[baseUrl.length-1] === '/' 
        ? baseUrl
        : baseUrl + '/'
    
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
    return {
        items(filter, done){
            return http.get(rootUrl, filter, function(err){
                parseJSON(this, err, done)
            })
        },
        get(id, done){
            let url = rootUrl  + id
            return http.get(url, function(err){
                parseJSON(this, err, done)
            })
        },
        add(data, done){
            return http.put(rootUrl, data, function(err){
                parseJSON(this, err, done)
            })
        },
        update(id, data, done){
            let url = rootUrl  + id
            return http.post(url, data, function(err){
                parseJSON(this, err, done)
            })
        },
        remove(id, done){
            let url = rootUrl  + id
            return http.delete(url, function (err) {
                if(err) return done(err)
                if(this.status !== 200) {
                    return done(new Error('http error: ' + this.status + '\n' + this.statusText))
                }
            })
        }
    }
}