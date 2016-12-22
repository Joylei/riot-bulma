import {observable} from 'riot'

export const Action_Login = 'login'
export const Action_Logout = 'logout'

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