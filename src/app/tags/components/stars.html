<stars class="stars">
    <div class="star" each="{ n in range() }" onclick="{ click(n+1) }" onmouseover="{ mouseover(n) }" onmouseleave="{ mouseleave(n) }">
        <span style="{ color: getColor(n) }">
            <i class="fa fa-star"></i>
            <i class="fa icon-copy fa-star { 'effect-' + opts.effect }" if="{ opts.effect && inited() && (n+1)===getAmount() }" ref="copy"></i>
        </span>
    </div>

    <script>
        this.loc = 0

        this.inited = ()=>{
            let val = this.getAmount()
            return typeof val !== 'undefined'
        }

        this.getAmount = ()=>{
            if(typeof this.amount!=='undefined'){
                return this.amount
            }
            return opts.amount
        }

        const DEFAULT_COLOR = '#bbb'
        this.getColor = (n)=>{
            let color = (n<getAmount() || (n<this.loc && !opts.readonly))? opts.color:DEFAULT_COLOR
            return color || DEFAULT_COLOR
        }

        this.range = ()=>{
            let items = []
            for(let i=0; i< opts.size; i++){
                items.push(i)
            }
            return items
        }

        this.mouseover = (n)=>{
            return (e) =>{
                this.loc = n + 1
                this.update()
            }
        }
        this.mouseleave = (n)=>{
            return (e)=>{
                this.loc = 0
                this.update()
            }
        }
        this.click = (i)=>{
            return (e)=>{
                if(!opts.readonly && !this.amount !== i){
                    //this.inited = true
                    this.amount = i
                    if(opts.effect){
                        //let el =e.currentTarget
                        setTimeout(()=>{
                            let el = this.refs.copy
                            if(el && el.parentNode){
                                el.parentNode.removeChild(el)
                            }
                        }, 1100)
                    }
                }
            }
        }
    </script>
    <style type="text/less">
    @import '../../less/variables.less'
    .stars {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: @color-primary;

        span {
            margin: 0 .2rem 0 0;
            line-height:1;
            position: relative;
            display:inline-block;
        }
        i {
            line-height:1;
            cursor: pointer;
        }
        .icon-copy{
            position:absolute;bottom:0;margin-left:-100%;
            animation-duration: 1s;
            animation-fill-mode: forwards;
        }
        .effect-grow{
            animation-name: grow;
        }
        .effect-rotate{
            animation-name: grow-rotate;
        }
        .effect-fade{
            animation-name: fade;
        }
    }
    @keyframes grow{0%{transform:scale(1)}99%{transform:scale(4);opacity:0;}to{transform:scale(1);opacity:0;}}
    @keyframes grow-rotate{0%{transform:scale(1) rotate(0deg)}99%{transform:scale(4) rotate(90deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:0;}}
    @keyframes fade{0%{transform:translate3d(0,0,0)}99%{transform:translate3d(0,-40px,0);opacity:0;}to{transform:scale(1) translate3d(0,0,0);opacity:0}}
    </style>
</stars>