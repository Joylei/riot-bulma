import {observable} from 'riot'
import modal from './lib/modal'
import {isObject} from '../shared/util'

export const Action_Login = 'login'
export const Action_Logout = 'logout'
export const Action_Toast = 'toast'
export {Action_Show_Modal,Action_Hide_Modal} from './lib/modal'

const state = {
    /**
     * logged in status
     */
    isLoggedIn: true,
    modal: {},
    toasts: [],
    /**
     * notify logged out
     */
    logout(){
        this.isLoggedIn = false
        this.trigger(Action_Logout)
    },
    /**
     * notify logged in
     */
    login(){
        this.isLoggedIn = true
        this.trigger(Action_Login)
    },
    /**
     * make a toast
     * @param {string|{type:string,title?:string,mode?:string}} type required
     * @param {string} title optional
     * @param {string} mode optional
     */
    toast(type, title, mode){
        let item = isObject(type) ? type : { type, title, mode }

        this.toasts.push(item)
        this.trigger(Action_Toast, this.toasts)
        //remove it
        setTimeout(()=>{
            let index = this.toasts.indexOf(item)
            this.toasts.splice(index, 1)
            this.trigger(Action_Toast, this.toasts)
        }, 1500)
    }
}

modal(state)

const store = observable(state)
export default store