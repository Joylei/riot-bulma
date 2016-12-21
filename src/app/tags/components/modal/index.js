import './toast.tag'

const toastItems = []
let toastTag

export function toast({ type, title, mode }){
    if(!toastTag){
        let body = document.getElementsByName(body)[0]
        let div = document.createElement('div')
        body.appendchild(div)
        toastTag = riot.mount(div, 'toast', { items:toastItems })[0]
    }

    const item = { title, mode, type }
    
    //add and update
    toastItems.push(item)
    toastTag.update()

    //remove
    setTimeout(()=>{
        let index = toastItems.indexOf(item)
        if(index!=-1){
            toastItems.splice(index, 1)
            toastTag.update()
        }
    }, 2000)
}