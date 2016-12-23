import '../components/page/page.tag'
import {resource} from '../../lib/http'
import store from '../../store'

<page-ajax>
    <page>
        <yield to="title">Ajax</yield>
        <yield to="content">
        <div class="columns is-multiline">
    <div class="column is-4" each="{ item,index in parent.items }">
      <a target="_blank" href="{ item.html_url }">
      <article class="message { parent.color[item.stargazers_count % 5] }">
        <div class="message-header has-text-centered">
          <h1 class="is-3 title has-text-centered">{ item.name }</h1>
          <img class="is-circle" src="{ item.owner.avatar_url }">
        </div>
        <div class="message-body">
          <nav class="level" style="width:100%;">
            <div class="level-item has-text-centered">
              <p class="heading">Star</p>
              <p class="title">{ item.stargazers_count }</p>
            </div>
            <div class="level-item has-text-centered">
              <p class="heading">Forks</p>
              <p class="title">{ item.forks_count }</p>
            </div>
          </nav>
        </div>
      </article>
      </a>
    </div>
  </div>
        </yield>
    </page>

    <script>
      const url = 'https://api.github.com/search/repositories?q=language%3Ajavascript&sort=stars'
      this.color = ['is-primary', 'is-info', 'is-success', 'is-warning', 'is-danger']
      this.items = []
      this.loading = true
      resource(url).items(null, (err, data)=>{
          this.loading = false
          if(err){
              store.toast('error', 'Something is wrong, please retry later!')
          }else{
              console.log(data)
              this.items = data.items
          }
          this.update()
      })
    </script>
    <style type="text/less">
        article h1{
    margin-top:10px;
    margin-bottom:20px;
    color:#fff;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    text-shadow: 0 1px 1px rgba(0,0,0,.5)
  }
  article img{
    background-color:#fff;
    width:128px;
    height:128px;
    margin-bottom:-74px;
  }
  article .message-body{
    padding-top:74px;
  }
    </style>
</page-ajax>