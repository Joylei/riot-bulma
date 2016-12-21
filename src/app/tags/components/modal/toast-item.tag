<toast-item>
    <div class="toast">
        <span class="tag is-{ opts.item.mode }"><i class="fa fa-{ getIcon(opts.item.type) }"></i></span>
        <div class="toast-title"><p>{ opts.item.title }</p></div>
    </div>
    <script>
        const icons = {'success': 'check', 'info': 'info', 'warning': 'warning', 'danger': 'close'}
        this.getIcon = function(icon){
            return icons[icon]
        }
    </script>

    <style lang="less">
.toast{
  box-shadow1: 0 0 5px rgba(0,0,0,.3);
  min-width: 240px;
  padding: 10px 12px;
  box-sizing: border-box;
  border-radius: 0 4px 4px 0;
  position: fixed;
  left: 50%;
  top: 30px;
  transform: translateX(-50%);
  background-color: #f1f1f1;
  transition: all .3s;
  opacity:1;
  overflow: hidden;
  z-index: 1050;
}
.toast .tag{
  position:absolute;
  left:0;
  top:0;
  width:40px;
  height:40px;
  border-radius:0;
  z-index:10;
}
.toast-title{
  margin-left:38px;
}
.toast.toast-enter{
    opacity:0;
    transform: translate3d(-50%, -50px, 0);
}

.toast.toast-leave-active {
    opacity:0;
    transform: translate3d(-50%, -50px, 0);
}

</style>
</toast-item>