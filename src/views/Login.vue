<template>
    <div class="login">
        <div class="fon_one"></div>
        <div class="login-content">
            <div class="content-form">
                <h1>ВХОД</h1>
                <form action="" @submit.prevent="sign_in()">
                    <div class="formItem">
                        <label for="email">Логин</label>
                        <input type="email" name="email" id="email" v-model.trim="email">
                    </div>
                    <div class="formItem">
                        <label for="password">Пароль</label>
                        <input type="password" name="password" id="password" v-model.trim="password">
                    </div>
                    <div class="formItem check">
                        <input type="checkbox" name="passSave" id="passSave">
                        <label for="passSave">Запомнить пароль</label>
                    </div>
                    <div class="formButton">
                        <input type="submit" value="Войти" class="button green">
                    </div>
                </form>
            </div>
        </div>
        <div class="fon_two"></div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            email: '',
            password: '' 
        }
    },
    methods:{
        async sign_in(){
            await this.$store.dispatch('sing_in', {
                email: this.email,
                password: this.password
            })
            .then(() => {
                this.$router.push('/Production')
            })
        },
    },
    mounted(){

    }
}
</script>

<style lang="scss">
@import "../assets/mixin/_mixin.scss";

.login {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 20;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    .fon_one{
        width: 100%;
        height: 100%;
        background: #fff url('../assets/image/fon2.svg') no-repeat top right;
    }
    .fon_two {
        width: 100%;
        height: 100%;
        background: #fff url('../assets/image/fon2.svg') no-repeat bottom left;
    }
    .login-content {
        width: 100%;
        height: 100%;
        background: rgba(18, 112, 181, 1) url('../assets/image/logo.svg') no-repeat 50% 5%;
        background-size: 25%;
        @include flex();
        .content-form {
            background: #fff;
            width: 70%;
            height: 50%;
            padding: 50px;
            @include flex();
            flex-direction: column;
            h1 {
                font-family: 'Montserrat Regular';
                font-weight: bolder;
                font-size: 35px;
                margin: 0;
                margin-bottom: 40px;
            }
            form {
                width: 50%;
                .formItem {
                    display: grid;
                    grid-template-columns: minmax(100px, min-content) 1fr;
                    align-items: flex-end;
                    margin-bottom: 30px;
                    label {
                        font-family: 'Montserrat Regular';
                        font-weight: bolder;
                        height: 25px;
                        font-size: 20px;
                    }
                    input {
                        border: none;
                        border-bottom: 1px solid #1270B5;
                        height: 25px;
                        outline: none;
                        font-family: inherit;
                        font-size: 17px;
                    }
                }
                .check {
                    @include flex();
                    label {
                        height: 25px;
                        font-size: 14px;
                        margin-top: 7px;
                        margin-left: 5px;
                        font-weight: normal;
                        font-style: italic;
                    }
                }
                .formButton {
                    @include flex();
                    input {
                        @include button();
                        padding: 8px 50px;
                    }
                }
            }
        }
    }
}
</style>