import store from '../../store'

<app-header>
    <section id="nav-section" class="hero is-primary">
    <div class="hero-head">
        <nav class="nav">
        <div class="nav-left">
            <a class="nav-item is-brand" href="#!/">
            <img src="{ img_logo }">
            </a>
        </div>
        <span id="nav-toggle" class="nav-toggle {'is-active': status}" onclick="{ toggle }">
            <span></span>
            <span></span>
            <span></span>
        </span>
        <div id="nav-menu" class="nav-right nav-menu {'is-active': status}">
            <a class="nav-item" href="#!/"><figure class="image is-24x24 is-right-5"><img class="is-circle" src="{ img_photo }"></figure><span>James Bond</span></a>
            <a class="nav-item" onclick="{ logout }"><span class="icon is-small"><i class="fa fa-power-off"></i></span>注销</a>
        </div>
        </nav>
    </div>
    </section>

    <script>
        this.img_photo = require('../../assets/photo.jpg')
        this.img_logo = require('../../assets/headerlogo-white.png')

        this.status = false
        this.toggle = (e)=> {
            this.status =!this.status
            this.update()
        }
        this.logout = (e) =>{
            e.preventDefault()
            alert('logout')
            store.logout()
        }
    </script>
</app-header>