import './menu-list.tag'

<menu>
    <aside class="menu">
        <virtual each="{ item in opts.data }">
            <p class="menu-label">
                <span class="icon is-small"><i class="fa { 'fa-' + item.icon }"></i></span>
                { item.title }
            </p>
            <ul class="menu-list" data-is="menu-list" if="{ item.children && item.children.length>0 }" data="{ item.children }"></ul>
        </virtual>
    </aside>
    <script>
        /**
        * opts.data: Array<MenuItem>
        * MenuItem: { title: string, href:string, icon:string, children?:Array<MenuItem>}
        */
    </script>
</menu>