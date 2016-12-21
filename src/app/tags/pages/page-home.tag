import '../components/page/page.tag'

<page-home>
    <page>
        <yield to="title">
            <span class="icon is-middle"><i class="fa fa-home is-right-5"></i></span>Home
        </yield>

        <yield to="menu">
              <div class="tabs is-boxed" style="margin:10px 20px 0;">
                <ul class="is-left">
                    <li class="{'is-active': parent.index===0}" onclick="{ parent.change.bind(parent, 0) }"><a href="javascript:void(0)">简介</a></li>
                    <li class="{'is-active': parent.index===1}" onclick="{ parent.change.bind(parent, 1) }"><a href="javascript:void(0)">布局</a></li>
                    <li class="{'is-active': parent.index===2}" onclick="{ parent.change.bind(parent, 2) }"><a href="javascript:void(0)">全局</a></li>
                    <li class="{'is-active': parent.index===3}" onclick="{ parent.change.bind(parent, 3) }"><a href="javascript:void(0)">缓存</a></li>
                </ul>
            </div>
        </yield>

        <yield to="content">
            <div class="tabs-content-container">
                <div class="fade" show="{ index===0 }">
                    <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-normal">
                        <div class="content">
                            <p class="title">Vue-Bulma</p>
                            <p class="subtitle">轻量级高性能MVVM Admin UI框架</p>
                            <p>偶然发现了bulma，自然语义定义的方式让人耳目一新，特别gzip后13.6k的size令人印象深刻，刚好基于vue+weui的移动端组件库demo已经接近完成，于是便抽空做了这套基于vue+bulma的轻量级UI。既然是后台管理UI，便可以任性的对IE无视，此处应有掌声。</p>
                            <p>为简化部署及升级便利，UI处理上原则不变动bulma的基础设置，只增加差异化的部分，同时谈化各种切换效果，力求整个UI界面的小清新。</p>
                            <div class="content">
                            <!-- Content -->
                            </div>
                        </div>
                        </article>
                    </div>
                    </div>
                    </div>

                    <div class="fade" show="{ index===1 }">
                    <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-normal">
                        <div class="content">
                            <p class="title">Flex Layout</p>
                            <p class="subtitle">弹性盒内滚动布局</p>
                            <p>支持所有新一代浏览器，为获得最优的效果优先推荐使用最新版Chrome，本项目设计为PC端的管理后台使用。</p>
                            <div class="content">
                            <!-- Content -->
                            </div>
                        </div>
                        </article>
                    </div>
                    </div>
                    <div class="tile is-ancestor">
                    <div class="tile is-vertical is-8">
                        <div class="tile">
                        <div class="tile is-parent is-vertical">
                            <article class="tile is-child notification is-primary">
                            <p class="title">Vertical...</p>
                            <p class="subtitle">Top tile</p>
                            </article>
                            <article class="tile is-child notification is-warning">
                            <p class="title">...tiles</p>
                            <p class="subtitle">Bottom tile</p>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child notification is-info">
                            <p class="title">Middle tile</p>
                            <p class="subtitle">With an image</p>
                            <figure class="image is-4by3">
                                <img src="http://placehold.it/640x480">
                            </figure>
                            </article>
                        </div>
                        </div>
                        <div class="tile is-parent">
                        <article class="tile is-child notification is-danger">
                            <p class="title">Wide tile</p>
                            <p class="subtitle">Aligned with the right tile</p>
                            <div class="content">
                            <!-- Content -->
                            </div>
                        </article>
                        </div>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-success">
                        <div class="content">
                            <p class="title">Tall tile</p>
                            <p class="subtitle">With even more content</p>
                            <div class="content">
                            <!-- Content -->
                            </div>
                        </div>
                        </article>
                    </div>
                    </div>
                </div>

                <div class="fade" show="{ index===2 }">
                    <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-normal">
                        <div class="content">
                            <p class="title">全局组件</p>
                            <p class="subtitle">Modal、Toast、Preloader</p>
                            <p>为了更方便的调用经常性组件，特别设计为全局组件，可处理多数场景，复杂的处理请自行添加入页面级组件</p>
                            <div class="content">
                            <!-- Content -->
                            </div>
                        </div>
                        </article>
                    </div>
                    </div>
                </div>

                <div class="fade" show="{ index===3 }">
                    <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-normal">
                        <div class="content">
                            <p class="title">缓存</p>
                            <p class="subtitle">keep-alive dom cache、ajax data cache、manifest resource cache</p>
                            <p>想让系统更加顺畅，缓存必不可少，vue-bulma中除了vue内置的keep-alive对dom进行缓存外，同时具备ajax的数据缓存机制。另外，还准备了manifest缓存指引，让前端飞起来。。。</p>
                            <div class="content">
                            <!-- Content -->
                            </div>
                        </div>
                        </article>
                    </div>
                    </div>
            </div>
        </yield>
    </page>
    <script>
        this.index = 0
        this.change = (index, e) =>{
            e.preventDefault()
            this.index = index
            this.update()
        }
    </script>
</page-home>