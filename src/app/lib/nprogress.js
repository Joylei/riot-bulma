import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import {observable} from 'riot'
//import {ready} from './dom'

function createWatcher(){
    //pending operations
    let pendingCount = 0
    let timerId
    let startTime = 0
    function inc(){
        pendingCount++
        if(!NProgress.isStarted()){
            NProgress.start()
            startTime = new Date()
        }
        if(timerId){
            clearTimeout(timerId)
            timerId = null
        }
    }

    function dec() {
        NProgress.inc()
        pendingCount--
        if(pendingCount > 0) return

        pendingCount = 0
        if(!timerId){
            let eclapased = new Date() - startTime
            timerId = setTimeout(()=>{
                NProgress.done()
                //NProgress.remove()
            }, eclapased > 1000 ? 300 : 600)
        }
    }

    function init(){
        NProgress.configure({ showSpinner: false })

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

let watcher = createWatcher()

watcher.on('page-loading', watcher.inc) 

watcher.on('page-loaded',  watcher.dec)

//TODO: add ajax events

export default watcher

