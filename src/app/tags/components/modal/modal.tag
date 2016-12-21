<modal>
    <div class="modal is-active">
        <div class="modal-background" onclick="{ unmount }"></div>
        <button class="modal-close" onclick="{ unmount  }"></button>
        <div class="modal-content">
            <div class="box">
            <p if="{ title }" class="title is-5">{ title }</p>
            <p if="{ content }" class="is-bottom-20">{ content }</p>
            </div>
        </div>
    </div>
    <style lang="less">
    .modal {
    opacity: 1;
    transition: opacity 300ms;
    }
    .modal .modal-background{
    background-color: rgba(0,0,0,0.7)
    }
    .modal .box{
    padding:15px;
    }
    .modal-hr{
    margin:15px -15px;
    }
    .modal a .icon {
        margin-left:0 !important;
        margin-right:5px !important;
    }
    </style>
</modal>