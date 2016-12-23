import '../components/page/page.tag'
//import '../components/stars.tag'

<page-rating>
    <page>
        <yield to="title">Rating</yield>
        <yield to="content">
        <div class="notification"></button>
  <label class="label">ReanOnly</label>
  <stars amount="{ 4 }" size="{ 5 }" readonly="{ true }"></stars>
  <br>
  <label class="label">iPhone 5</label>
  <stars amount="{ 3 }" size="{ 5 }" readonly="{ false }" color="{ '#04be02' }"></stars>
  <br>
  <label class="label">iPhone 6</label>
  <stars amount="{ 3 }" size="{ 5 }" readonly="{ false }" mode="{ 'rotate' }"></stars>
  <br>
  <label class="label">iPhone 6s</label>
  <stars amount="{ 8 }" size="{ 10 }" readonly="{ false }" color="{ '#f30' }" icon="{ 'heart' }" mode="{ 'grow' }"></stars>
  <br>
  <label class="label">iPhone 7</label>
  <stars amount="{ 8 }" size="{ 10 }" readonly="{ false }" color="{ '#f30' }" icon="{ 'rocket' }" mode="{ 'grow' }"></stars>
  </div>
        </yield>
    </page>
</page-rating>