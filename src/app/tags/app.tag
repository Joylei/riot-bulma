import route from '../route'
import {isFunction} from '../../shared/util'
import store, {Action_Login, Action_Logout} from '../store'
import './components/page/header.tag'
import './components/page/sidebar.tag'

<app>
    <header if="{ isLoggedIn }"></header>
    <section class="page-container">
        <sidebar if="{ isLoggedIn }"></sidebar>
        <div class="page" data-is="{ page }" query="{ query }" ref="page"></div>
    </section>

    <script>
        function getHash(){
            return (window.location.hash || '').toLowerCase()
        }

        const loginUrl = '#!/login'

        const stop = route((conf,query)=>{
            if(getHash() != loginUrl && !store.isLoggedIn){
                store.logout()
                return
            }
            if(getHash() == loginUrl && store.isLoggedIn){
                store.login()
                return
            }

            const name = 'page-' + conf.page
            require(`./pages/${name}.tag`) //webpack dynamic require; otherwise you have to import all pages in advance

            //have to manually inject style due to lazy loading tag definition
            riot.util.styleManager.inject()

            this.page = name
            this.query = query
            this.update()

            return this.refs.page //return the mounted page tag
        }, '#!/')

        this.on('unmount', ()=> stop())

        this.isLoggedIn = store.isLoggedIn
        store.on(Action_Login, ()=>{
            this.isLoggedIn = store.isLoggedIn
            if(getHash() == loginUrl){
                window.location.href = '#!/'
            }else{
                this.update()
            }
        })
        store.on(Action_Logout, ()=>{
            this.isLoggedIn = store.isLoggedIn
            if(getHash() != loginUrl){
                window.location.href = loginUrl
            }else{
                this.update()
            }
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

        .page-container{
            top:50px;
        }

        header {
            position: fixed;
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
            overflow-y: scroll;
            overflow-x: hidden;
            opacity: 1;
            transition: opacity .3s;
        }
    </style>
</app>