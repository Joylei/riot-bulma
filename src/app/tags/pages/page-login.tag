import store from '../../store'

<page-login>
    <div id="login-modal" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content" style="width:300px;">
            <div class="box">
            <h3 class="title is-4">System Login</h3>
            <p class="control has-icon">
                <input class="input" type="text" placeholder="Account">
                <i class="fa fa-user"></i>
            </p>
            <p class="control has-icon">
                <input class="input" type="password" placeholder="Password">
                <i class="fa fa-lock"></i>
            </p>
            <p class="control">
                <button class="button is-primary" onclick="{ login }">Login</button>
            </p>
            </div>
        </div>
    </div>

    <script>
        this.login = (e)=>{
            store.login()
        }
    </script>
</page-login>