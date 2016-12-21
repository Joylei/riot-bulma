import route, { DEFAULT_TITLE } from '../route'
import {isFunction} from '../../shared/util'
import './components/app-header.tag'
import store, {Action_Login, Action_Logout} from '../store'

<app>
    <section>
        <app-header if="{ isLoggedIn }"></app-header>
        <section class="page">
            <sidebar if="{ isLoggedIn }"></sidebar>
            <div class="page-container">
                <div data-is="{ page }" query="{ query }" ref="page"></div>
            </div>
        </section>
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
            this.page = name
            this.query = query
            this.update()

            return this.refs.page //return the mounted page tag
        }, '#!')

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
</app>