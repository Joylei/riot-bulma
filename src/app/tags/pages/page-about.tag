import '../components/page/page.tag'

<page-about>
    <page>
        <yield to="title">About</yield>
        <yield to="content">
            <div class="box no-shadow">
                <p class="title">RIOT-Bulma</p>
                <p class="subtitle">轻量级高性能Admin UI框架</p>
                <p><span class="icon"><i class="fa fa-github"></i></span>
                <a src="https://github.com/joylei/riot-bulma">https://github.com/joylei/riot-bulma</a></p>
            </div>
        </yield>
    </page>
</page-about>