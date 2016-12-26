import {
    isFunction,
    extend
} from '../../shared/util'

export const Action_Show_Modal = 'show_modal'
export const Action_Hide_Modal = 'hide_modal'

export default function modal(obj) {
    let src = obj || {}
    return extend(src, {
        showModal(modal) {
            this.modal = extend({}, modal || {})
            this.modal.active = true

            const handler = (fn)=>{
                return (e)=>{
                    if(isFunction(fn)){
                        if(fn.call(this, e) === false) return
                    }
                    this.hideModal()
                }
            }
            this.modal.onclose = handler(this.modal.onclose)
            this.modal.buttons = this.modal.buttons || []
            this.modal.buttons.forEach(btn => {
                btn.onclick = handler(btn.onclick)
            })
            this.trigger(Action_Show_Modal, this.modal)
        },

        showConfirm(title, content, cb) {
            this.showModal({
                title,
                content,
                mode: 'confirm',
                buttons: [{
                    title: 'YES',
                    icon: 'check',
                    classes: 'is-primary',
                    onclick: () => {
                        this.hideModal()
                        if (isFunction(cb)) {
                            cb(true)
                        }
                    },
                }, {
                    title: 'NO',
                    icon: 'close',
                    classes: 'is-light',
                    onclick: () => {
                        this.hideModal()
                        if (isFunction(cb)) {
                            cb(false)
                        }
                    }
                }]
            })
        },

        showAlert(title, content) {
            this.showModal({
                title,
                content,
                mode: 'alert',
                buttons: [{
                    title: 'OK',
                    icon: 'check',
                    classes: 'is-primary'
                }]
            })
        },

        hideModal() {
            this.modal.active = false
            this.trigger(Action_Hide_Modal, this.modal)
        }
    })
}