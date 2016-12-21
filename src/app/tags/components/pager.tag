<pager>
    <nav class="pagination">
    <a class="{'is-disabled':opts.index===1}" class="button" onclick="{ page.bind(null, opts.index-1) }">{ opts.firstText || 'First' }</a>
    <a class="{'is-disabled':opts.index===count}" class="button" @click="{ page.bind(null, opts.index+1) }">{ opts.lastText || 'Last' }</a>
    <ul>
        <li if="{ opts.count>0 && opts.index>1 }" onclick="{ page.bind(null, 1) }">
        <a class="button">1</a>
        </li>
        <li if"{ opts.count>3 && opts.index>3 }">
        <span>...</span>
        </li>
        <li if="{ opts.count>0 && opts.index>2 }" onclick="{ page.bind(null, opts.index-1) }">
        <a class="button">{ opts.index-1 }</a>
        </li>
        <li if="{ opts.count>0 }" onclick="{ page.bind(null, opts.index) }">
        <a class="button is-primary" class="{'is-loading': opts.loading}">{ opts.index }</a>
        </li>
        <li if="{ opts.index<opts.count }" onclick="{ page.bind(null, opts.index+1) }">
        <a class="button">{ opts.index+1 }</a>
        </li>
        <li if="{ (opts.index+2)<opts.count }">
        <span>...</span>
        </li>
        <li if="{ (opts.index+1)<opts.count }" onclick="{ page.bind(null, opts.count) }">
        <a class="button">{ opts.count }</a>
        </li>
    </ul>
    </nav>

    <script>
        /**
        * @param {Number} opts.index required
        * @param {Number} opts.count required
        * @param {(index)=>void} opts.page required
        * @param {Boolean} opts.loading optional
        * @param {string} opts.firstText optional
        * @param {string} opts.lastText optional
        */

        this.page = function(index, e){
            e.preventDefault()

            if(typeof opts.page === 'function'){
                opts.page(index)
            }
        }
    </script>
</pager>