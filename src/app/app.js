import * as riot from 'riot'

import './tags/app.tag'
import './less/app.less'

riot.mount('app')

if (module.hot) {
    module.hot.accept()
}