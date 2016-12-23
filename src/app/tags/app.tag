import route from '../route'
import {isFunction} from '../../shared/util'
import store, {Action_Login, Action_Logout, Action_Toast} from '../store'
import './components/page/header.tag'
import './components/page/sidebar.tag'
import './components/modal/toast.tag'

<app>
    <header if="{ isLoggedIn }"></header>
    <section class="page-container">
        <sidebar if="{ isLoggedIn }"></sidebar>
        <div class="page" data-is="{ page }" query="{ query }" ref="page"></div>
        <toast items="{ toasts }"></toast>
    </section>

    <script>
        const baseUrl='#!/', homeUrl='#!/',loginUrl = '#!/login'

        function getHash(){
            return (window.location.hash || '').toLowerCase()
        }

        function isLoginUrl(){
            return getHash() === loginUrl
        }

        function checkAuth(){
            if(!isLoginUrl() && !store.isLoggedIn){
                store.logout()
                return
            }
            if(isLoginUrl() && store.isLoggedIn){
                store.login()
                return
            }
            return true
        }

        //start routes
        const stop = route((conf,query)=>{
            if(!checkAuth()) return

            const name = 'page-' + conf.page
            require(`./pages/${name}.tag`) //webpack dynamic require; otherwise you have to import all pages in advance

            //have to manually inject style???
            //not sure what happened, a bug???
            riot.util.styleManager.inject()

            //it may be a good idea to use mount directly here
            this.page = name
            this.query = query
            this.update()

            return this.refs.page //return the mounted page tag
        }, baseUrl)

        this.on('unmount', ()=> stop())

        //login status
        this.isLoggedIn = store.isLoggedIn
        store.on(Action_Login, ()=>{
            this.isLoggedIn = store.isLoggedIn
            if(isLoginUrl()){
                window.location.href = homeUrl
            }else{
                this.update()
            }
        })
        store.on(Action_Logout, ()=>{
            this.isLoggedIn = store.isLoggedIn
            if(!isLoginUrl()){
                window.location.href = loginUrl
            }else{
                this.update()
            }
        })

        //toasts
        this.toasts = store.toasts
        store.on(Action_Toast, ()=>{
            this.toasts = store.toasts
            this.update()
        })
    </script>

    <style type="text/less">
        :scope, .page-container{
            display:block;
            position: absolute;
            top:0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }

        :scope, .page-container, header, sidebar, .page{
            border:0;
            margin:0;
            padding:0;
        }

        .page-container{
            top:50px;
        }

        header {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            z-index: 1030;
        }

        sidebar {
            position: absolute;
            top:0;
            left:0;
            bottom:0;
            width: 220px;
        }

        .page {
            position: absolute;
            top:0;
            left:220px;
            bottom:0;
            right:0;
            overflow-y: auto;
            overflow-x: hidden;
            opacity: 1;
            transition: opacity .3s;
        }
    </style>
</app>