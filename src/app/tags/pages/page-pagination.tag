import '../components/page/page.tag'
import '../components/pagination.tag'

import watcher from '../../lib/nprogress'

<page-pagination>
    <page>
        <yield to="title">Pagination</yield>
        <yield to="content">

        <div class="box no-shadow">
      <p class="title">Pagination</p>
      <p class="subtitle">vue页码组件</p>
      <p>vue典型组件，从这个组件的设计中体现了与jquery的巨大不同，组件中只需要一行代码即可实现比较复杂的页码显示处理，使用了配置设定来代替代码驱动dom，彻底告别了乱糟糟的代码。</p>
      <hr>
      <div class="content { 'is-loading': parent.loading }">
        current page is { parent.page }
      </div>
      <pagination index="{ parent.page }" count="{ parent.total }" loading="{ parent.loading }" page="{ parent.loadPage }"></pagination>
  </div>

        </yield>
    </page>

    <script>
        this.total = 18 //total pages
        this.page = 1 //current page
        this.loading = false
        this.loadPage = (index) => {
            watcher.inc()
            this.loading = true
            this.page = index
            this.update()

            //simulate data loading...
            setTimeout(()=>{
                this.loading = false
                this.update()
                watcher.dec()
            }, 1500)
        }

        this.loadPage(1)
    </script>
</page-pagination>