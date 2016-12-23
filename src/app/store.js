import {observable} from 'riot'

export const Action_Login = 'login'
export const Action_Logout = 'logout'
export const Action_Toast = 'toast'

const state = {
    isLoggedIn: true,
    modal: {},
    toasts: [],
    logout(){
        this.isLoggedIn = false
        this.trigger(Action_Logout)
    },
    login(){
        this.isLoggedIn = true
        this.trigger(Action_Login)
    },
    toast(type, title, mode){
        let item
        if(Object.prototype.toString.call(type) === '[object Object]'){
            item = type
        }else if(type){
            item = { type, title, mode }
        }

        if(item){
            this.toasts.push(item)
            this.trigger(Action_Toast, this.toasts)

            setTimeout(()=>{
                let index = this.toasts.indexOf(item)
                this.toasts.splice(index, 1)
                this.trigger(Action_Toast, this.toasts)
            }, 1500)
        }
    }
}

// function createStore(obj){
//     let store = observable(obj)
//     Object.keys(store).forEach(key =>{
//         let val = store[key]
//         if(typeof val === 'function'){
//             store[key] = val.bind(store)
//         }
//     })
//     return store
// }

const store = observable(state)
export default store