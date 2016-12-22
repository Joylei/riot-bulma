<menu-list>
    <!--the root is ul-->
    <li each="{ item,index in opts.data }">
        <!--no child-->
        <a if="{ !hasChild(item) }" href="{ item.href }">
            <span class="icon is-small"><i class="fa { 'fa-' + (item.icon || 'caret-right') }"></i></span>
            { item.title }
        </a>
        <!--has child-->
        <a href="javascript:void(0)" if="{ hasChild(item) }" class="{ 'menu-toggle': isExpanded(index) }" onclick="{ toggle.bind(null,index) }">
            <span class="icon is-small"><i class="fa { 'fa-' + (item.icon || 'caret-right') }"></i></span>
            { item.title }
            <span class="icon is-small is-angle"><i class="fa fa-angle-down"></i></span>
        </a>
        <ul class="menu-list" data-is="menu-list" if="{ hasChild(item) }" show="{ isExpanded(index) }" data="{ item.children }"></ul>
    </li>
    <script>
        /**
        * opts.data: Array<MenuItem>
        * MenuItem: { title: string, href:string, icon:string, children?:Array<MenuItem>}
        */

        this.hasChild = (item)=> item.children && item.children.length>0

        this.states = {}
        this.isSelected = (item,index) =>{
            //TODO: determine the link is selected or not
        }
        this.isExpanded = (index) =>{
            return !!this.states[index]
        }
        this.toggle = (index, e) =>{
            e.preventDefault()
            this.states[index] = !this.states[index]
            this.update()
        }
    </script>
</menu-list>