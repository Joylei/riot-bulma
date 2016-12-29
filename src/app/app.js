import './assets/less/app.less'

import * as riot from 'riot'
import './tags/app.html'
import './lib/preloader'

riot.mount('app')

if (module.hot) {
    module.hot.accept()
}