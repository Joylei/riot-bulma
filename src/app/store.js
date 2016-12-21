import {observable} from 'riot'

const state = {
    isLoggedIn: true,
    modal: {},
    toasts: [],
}

export const Action_Login = 'login'
export const Action_Logout = 'logout'

const store = observable(state)

store.logout = function(){
    store.isLoggedIn = false
    store.trigger(Action_Logout)
}

store.login = function(){
    store.isLoggedIn = true
    store.trigger(Action_Login)
}

export default store