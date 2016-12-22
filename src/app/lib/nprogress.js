import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import {observable} from 'riot'
import {ready} from './dom'

let watcher = observable()

watcher.on('page-loading', inc) 

watcher.on('page-loaded',  dec)

//TODO: add ajax events

//pending operations
let count = 0
let timerId
function inc(){
    count++
    if(!NProgress.isStarted()){
        NProgress.start()
    }
    if(timerId){
        clearTimeout(timerId)
        timerId = null
    }
}

function dec() {  
    count--
    if(count<=0){
        count = 0
        if(!timerId){
            timerId = setTimeout(()=>{
                NProgress.done()
                //NProgress.remove()
            }, 300)
        }
    }
}

function init(){
    NProgress.configure({ showSpinner: false })

    //wait page ready event
    inc()
    ready(dec)
}

init()
export default watcher

