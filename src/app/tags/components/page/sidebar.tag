import store from '../../../store'
import '../menu/menu.tag'

<sidebar>
    <section class=menu>
    <div class="panel-block">
    <article class="media">
    <figure class="media-left">
        <p class="image is-48x48">
        <img class="is-rounded" src="{ img_profile }">
        </p>
    </figure>
    <div class="media-content">
        <div class="content">
        <p>
            <strong>James Bond</strong> <small>Military Intelligence, Section 6</small>
        </p>
        </div>
        <nav class="level">
        <div class="level-left">
            <a class="level-item">
            <span class="icon is-small"><i class="fa fa-reply"></i></span>
            </a>
            <a class="level-item">
            <span class="icon is-small"><i class="fa fa-retweet"></i></span>
            </a>
            <a class="level-item">
            <span class="icon is-small"><i class="fa fa-heart"></i></span>
            </a>
        </div>
        </nav>
    </div>
    <div class="media-right">
        <a><i class="fa fa-info-circle" aria-hidden="true"></i></a>
    </div>
    </article>
    </div>
    <menu data="{ menus }"></menu>
    <a class="panel-block" onclick="{ logout }">
        <span class="icon is-small"><i class="fa fa-power-off"></i></span><span>Log Off</span>
    </a>
    </section>

    <script>
        this.img_profile = require('../../../assets/photo.jpg')

        this.menus = [
            {
                title: 'General',
                icon: 'cogs',
                children:[
                    { title: 'Dashboard', icon:'dashboard', href:'#!/setting' }
                ]
            },
            {
                title: 'administration',
                icon: 'th',
                children:[
                    { title:'Home', icon: 'home', href: '#!/' },
                    {
                        title: 'Elements',
                        icon: 'diamond',
                        children:[
                            {title:'Buttons', href: '#!/buttons'},
                            {title: 'Card', href: '#!/card'},
                            {title: 'Content', href: '#!/content'},
                            {title: 'Form', href: '#!/form'},
                            {title: 'Icons', href: '#!/icons'},
                            {title: 'image', href: '#!/image'},
                            {title: 'Level', href: '#!/level'},
                            {title: 'MediaObject', href:'#!/mediaobject'},
                            {title: 'Message', href:'#!/message'},
                            {title: 'Nav', href:'#!/nav'},
                            {title: 'Notifications', href: '#!/notifications'},
                            {title: 'Panel', href:'#!/panel'},
                            {title: 'Table', href: '#!/table'},
                            {title: 'Tabs', href:'#!/tabs'},
                            {title: 'Tags', href:'#!/tags'},
                            {title: 'Title', url: '#!/title'}
                        ]
                    },
                    {
                        title: 'Components',
                        icon: 'puzzle-piece',
                        children:[
                            {title:'Ajax', href: '#!/ajax'},
                            {title:'Charts', href: '#!/charts'},
                            {title:'Collapse', href: '#!/collapse'},
                            {title:'Modal', href:'#!/modal'},
                            {title:'Pagination', href:'#!/pagination'},
                            {title:'Progress', href: '#!/progress'},
                            {title:'Rating', href: '#!/rating'},
                            {title: 'Timeline', href: '#!/timeline'},
                            {title: 'Toast', href: '#!/toast'},
                            {title: '404', href: '#!/404'}
                        ]
                    },
                    {
                        title: 'About', icon: 'cube', href: '#!/about'
                    }
                ]
            }
        ]

        this.logout = (e)=>{
            e.preventDefault()
            store.logout()
        }
    </script>

    <style type="text/less">

    #menu-toggle-switch{
    position:absolute;
    top:0;
    background-color:rgba(0,0,0,0.5);
    color:#ccc;
    padding:0 3px;
    right:-18px;
    z-index:-1;
    }
    section.menu {
    position:absolute;
    left:0;
    top:0;
    width:100%;
    bottom:0;
    background-color:#fafafa;
    box-shadow:1px 0 1px rgba(0,0,0,0.2);
    display:flex;
    flex-direction:column;
    z-index:10;
    }
    aside.menu{
    display:flex;
    flex-basis:auto;
    flex-direction:column;
    flex-grow:1;
    flex-shrink:1;
    padding:10px;
    overflow-x:hidden;
    overflow-y:auto;
    }
    section.menu .panel-block{
    display:block;
    flex-basis:auto;
    flex-direction:column;
    flex-grow:0;
    flex-shrink:0;
    line-height:20px;
    background-color:#eee;
    border-radius:0;
    box-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    border-bottom:none;
    }
    section.menu .panel-block:first-child{
    box-shadow: 0 1px 0 rgba(0,0,0,0.12);
    }
    aside.menu .menu-container {
    margin-bottom:20px;
    }
    aside.menu .menu-label {
    font-weight:700;
    }
    aside.menu .menu-label .icon{
    vertical-align: bottom;
    margin-right:6px;
    }
    aside.menu a {
    position:relative;
    line-height:20px;
    }
    aside.menu li ul {
    margin: 5px 0 5px 18px;
    }
    aside.menu .menu-subcontainer {
    overflow: hidden;
    transition: all .3s;
    }
    section.menu a .icon {
    vertical-align: baseline;
    margin-right:5px;
    }
    aside.menu .icon.is-angle {
    position: absolute;
    margin-right:0;
    right: 10px;
    transition: transform .3s ease;
    }
    aside.menu .menu-toggle .icon.is-angle {
    transform: rotate(180deg);
    }
    </style>
</sidebar>