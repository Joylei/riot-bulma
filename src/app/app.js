import * as riot from 'riot'

import './tags/app.tag'

riot.mount('app')

if (module.hot) {
    module.hot.accept()
}