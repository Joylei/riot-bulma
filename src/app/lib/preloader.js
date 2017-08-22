import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import {
    observable
} from 'riot'
import http from './http'
//import {ready} from './dom'

function createLoader() {
    //pending operations
    let pendingCount = 0
    let timerId
    let startTime = 0

    function inc() {
        pendingCount++
        if (!NProgress.isStarted()) {
            NProgress.start()
            startTime = new Date()
        }
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
    }

    function dec() {
        NProgress.inc()
        pendingCount--
        if (pendingCount > 0) return

        pendingCount = 0
        if (!timerId) {
            let eclapsed = new Date() - startTime
            timerId = setTimeout(() => {
                NProgress.done()
                //NProgress.remove()
            }, eclapsed > 1000 ? 300 : 600)
        }
    }

    function init() {
        NProgress.configure({
            showSpinner: false
        })

        //wait page ready event
        //inc()
        //ready(dec)
        NProgress.start()
        NProgress.inc()
    }

    init()

    return observable({
        inc,
        dec
    })
}

let loader = createLoader()

//hook http events
http.onstart = () => loader.inc()
http.oncomplete = () => loader.dec()

export default loader