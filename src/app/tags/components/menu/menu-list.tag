<menu-list>
    <!--the root is ul-->
    <li each="{ item in opts.data }">
        <a  if="{ !item.children || item.children.length==0}" href="{ item.href }">
            <span class="icon is-small"><i class="fa { 'fa-' + (item.icon || 'caret-right') }"></i></span>
            { item.title }
        </a>
        <virtual if="{ item.children && item.children.length>0 }">
            <a href="javascript:void(0)">
                <span class="icon is-small"><i class="fa { 'fa-' + (item.icon || 'caret-right') }"></i></span>
                { item.title }
                <span class="icon is-small is-angle"><i class="fa fa-angle-down"></i></span>
            </a>
            <ul class="menu-list" data-is="menu-list" 
                data="{ item.children }"></ul>
        </virtual>
    </li>
    <script>
        /**
        * opts.data: Array<MenuItem>
        * MenuItem: { title: string, href:string, icon:string, children?:Array<MenuItem>}
        */
    </script>
</menu-list>