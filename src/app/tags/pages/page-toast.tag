import '../components/page/page.tag'
import store from '../../store'

<page-toast>
    <page>
        <yield to="title">Toast</yield>
        <yield to="content">
          <div class="box no-shadow">
    <p class="title">Toast</p>
    <p class="subtitle">...</p>
    <div class="block">
      <a class="button" onclick="{ parent.toast(0) }">Normal</a>
      <a class="button is-info" onclick="{ parent.toast(1) }">Info</a>
      <a class="button is-success" onclick="{ parent.toast(2) }">Success</a>
      <a class="button is-warning" onclick="{ parent.toast(3) }">Warning</a>
      <a class="button is-danger" onclick="{ parent.toast(4) }">Danger</a>
    </div>
  </div>
        </yield>
    </page>

    <script>
        const messages=[
            { type: 'success' },
            { type: 'info', title: 'this is an info message'},
            { type: 'success', title: 'this is a success message'},
            { type: 'warning', title: 'this is a warning message'},
            { type: 'danger', title:'this is a danger message'}
        ]

        this.toast = (index)=>{
            return (e) =>{
                e.preventDefault()
                let item = messages[index]
                store.toast(item.type, item.title)
            }
        }
    </script>
</page-toast>