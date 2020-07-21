<template>
    <div class="navBar">
        <div class="navBar-logo">
            <img src="../assets/image/logo.svg" alt="">
        </div>
        <div class="navBar-infoUser">
            <div class="infoUser_foto">
                <img :src="user.avatar" alt="">
            </div>
            <div class="infoUser_fio">
                <span>{{user.last_name}}</span>
                <div class="fio_name">
                    <span>{{user.first_name}}</span>
                    <span>{{user.patronymic}}</span>
                </div>
            </div>
            <div class="infoUser_position">
                <span v-if="user.position == 'TL'">Администратор</span>
                <span v-else-if="user.position == 'LS'">Логист</span>
            </div>
        </div>
        <div class="navBar_link">
            <router-link :to="'/Production'" tag="div">
                <div class="link_item">
                    <img src="../assets/image/ProductionImg.svg" alt="">
                    <span>Производство</span>
                </div>
            </router-link>
            <router-link :to="'/Sales'" tag="div">
                <div class="link_item">
                    <img src="../assets/image/SalesImg.svg" alt="">
                    <span>Продажи</span>
                </div>
            </router-link>
            <router-link :to="'/Product'" tag="div">
                <div class="link_item">
                    <img src="../assets/image/ProductImg.svg" alt="">
                    <span>Продукция</span>
                </div>
            </router-link>
        </div>
        <div class="navBar_options">
            <div class="options_item" @click="option = !option, Inp()">
                <img src="../assets/image/option.svg" alt="">
                <span>Настройки</span>
            </div>
            <router-link :to="'/'" tag="div">
                <div class="options_item" @click="exit()">
                    <img src="../assets/image/logOut.svg" alt="">
                    <span>Выход</span>
                </div>
            </router-link>
            <div class="options_item" @click="help = !help">
                <img src="../assets/image/help.svg" alt="">
                <span>Помощь</span>
            </div>
        </div>
        <div class="filter" v-show="option" @click="option = false"></div>
        <div class="filter" v-show="help" @click="help = false"></div>
        <div class="modal" v-show="option">
            <form action="" @submit.prevent="updateUSER()">
                <div class="content_item block_one">
                    <div class="formItem foto">
                        <div class="fotoUser">
                            <img :src="user.avatar" alt="">
                        </div>
                        <input type="file" name="" id="">
                    </div>
                    <div class="position">
                        <span v-if="user.position == 'TL'">Администратор</span>
                        <span v-else-if="user.position == 'LS'">Логист</span>
                        <span>id: {{user.id}}</span>
                    </div>
                    <div class="formItem">
                        <label for="surname">Фамилия</label>
                        <input type="text" name="surname" id="surname" v-model="last_name">
                    </div>
                    <div class="formItem">
                        <label for="name">Имя</label>
                        <input type="text" name="name" id="name" v-model="first_name">
                    </div>
                    <div class="formItem">
                        <label for="patronymic">Отчество</label>
                        <input type="text" name="patronymic" id="patronymic" v-model="patronymic">
                    </div>
                </div>
                <div class="content_item block_two">
                    <div class="formItem">
                        <label for="birthday">Дата рождения</label>
                        <input type="date" name="birthday" id="birthday" v-model="birthday">
                    </div>
                    <div class="formItem">
                        <label for="tel">Телефон</label>
                        <input type="tel" name="tel" id="tel" v-model="phone">
                    </div>
                    <div class="formItem">
                        <label for="email">Эл.почта</label>
                        <input type="email" name="email" id="email" v-model="email">
                    </div>
                    <div class="formItem">
                        <label for="skype">Skype</label>
                        <input type="text" name="skype" id="skype" v-model="skype">
                    </div>
                    <div class="formItem">
                        <label for="region">Регион</label>
                        <input type="text" name="region" id="region" v-model="region">
                    </div>
                    <div class="formItem">
                        <label for="city">Город</label>
                        <input type="text" name="city" id="city" v-model="city">
                    </div>
                </div>
                <div class="form_button">
                    <input type="button" value="Отмена" @click="option = false" class="buttonCancel">
                    <input type="submit" value="Сохранить изменения" class="buttonSave" @click="option = false">
                </div>
            </form>
        </div>
        <div class="modal" v-show="help">
            <div class="modal-content">
                <div class="content-headline">
                    <h1>Нужна помощь?</h1>
                </div>
                <div class="content-text">
                    <p>
                        В случае технических неполадок вы можеет обратиться за помощью по телефону 8 (918) 550-50-50, написать письмо на электронную почту поддержки support@example.ru или оставить свой комментарий ниже.
                    </p>
                </div>
                <div class="content-input">
                    <textarea name="" id="" placeholder="Введите сообзение"></textarea>
                </div>
                <div class="content-button">
                    <input type="button" value="Отмена" @click="help = false" class="buttonCancel">
                    <input type="submit" value="Отправить" class="buttonSave">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            option: false,
            help: false,
            last_name: '',
            first_name: '',
            patronymic: '',
            phone: '',
            email: '',
            birthday: '',
            skype: '',
            region: '',
            city: ''
        }
    },
    mounted(){
        this.$store.dispatch('axiosUser')
    },
    computed: {
        user(){
            return this.$store.getters.USER
        }
    },
    methods:{
        Inp() {
            this.last_name = this.user.last_name
            this.first_name = this.user.first_name,
            this.patronymic = this.user.patronymic,
            this.phone = this.user.phone,
            this.birthday = this.user.birthday,
            this.skype = this.user.skype,
            this.region = this.user.region,
            this.city = this.user.city
        },
        exit(){
            this.$store.dispatch('sign_out')
            .then(() => {
                this.$router.push('/')
            })
        },
        updateUSER() {
            this.$store.dispatch('userPut', {
                last_name: this.last_name,
                first_name: this.first_name,
                patronymic: this.patronymic,
                phone: this.phone,
                birthday: this.birthday,
                skype: this.skype,
                region: this.region,
                city: this.city
            }) 
            .then(()=>{
                this.$store.dispatch('axiosUser')
                this.last_name = this.first_name = this.patronymic = this.phone = this.email = this.birthday = this.skype = this.region = this.city = ''
            })
        }
    }
}
</script>

<style lang="scss">
@import "../assets/mixin/_mixin.scss";

.router-link-exact-active {
    span {
        font-weight: bold;
    }
}

.navBar {
    grid-column: 1/2;
    grid-row: 1/3;
    background: rgba(18, 112, 181, 0.75);
    box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.1);
    .navBar-logo {
        height: 60px;
        box-shadow: 0px 10px 6px 0px rgba(0, 0, 0, 0.06);
        @include flex();
        img {
            height: 40px;
            width: auto;
        }
    }
    .navBar-infoUser {
        margin: 20px;
        height: 250px;
        @include flex();
        flex-direction: column;
        border-bottom: 4px double #fff;
        .infoUser_foto {
            width: 100px;
            height: 100px;
            overflow: hidden;
            border-radius: 50%;
            img {
                height: auto;
                width: 100%;
            }
        }
        .infoUser_fio {
            @include flex();
            flex-direction: column;
            margin-top: 10px;
            font-family: 'Montserrat Regular';
            font-weight: bold;
            margin-bottom: 10px;
            span {
                font-size: 25px;
                margin-bottom: 5px;
            }
            .fio_name {
                span {
                    font-size: 18px;
                    margin: 0 3px;
                }
            }
        }
        .infoUser_position {
            span {
                font-style: italic;
            }
        }
    }
    .navBar_link {
        margin: 0 20px;
        height: calc(100% - 450px);
        overflow-y: auto;
        .link_item {
            @include flex();
            justify-content: flex-start;
            cursor: pointer;
            padding: 25px 0;
            border-bottom: 1px solid #fff;
            img {
                margin-right: 10px;
                margin-left: 20px;
            }
            span {
                color: #fff;
            }
        }
    }
    .navBar_options {
        margin: 0 20px;
        @include flex();
        flex-direction: column;
        align-items: flex-start;
        .options_item {
            @include flex();
            margin-left: 30px;
            margin-bottom: 8px;
            cursor: pointer;
            span {
                color: #fff;
                margin-left: 10px;
            }
        }
    }
    .filter {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        z-index: 10;
    }
    .modal {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        @include flex();
        z-index: 11;
        form {
            width: 40%;
            background: #fff;
            padding: 40px;
            .content_item {
                .formItem {
                    display: grid;
                    grid-template-columns: minmax(150px, min-content) 1fr;
                    align-items: flex-end;
                    label {
                        font-family: 'Montserrat Regular';
                        font-weight: bolder;
                        height: 25px;
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
            }
            .block_one {
                display: grid;
                grid-template-columns: 180px calc(100% - 180px);
                margin-bottom: 40px;
                .foto {
                    grid-column: 1/2;
                    grid-row: 1/5;
                    @include flex();
                    flex-direction: column;
                    align-items: flex-start;
                    .fotoUser {
                        width: 150px;
                        height: 150px;
                        overflow: hidden;
                        border-radius: 50%;
                        img {
                            height: auto;
                            width: 100%;
                        }
                    }
                    input {
                        width: 150px;
                        margin-top: 10px;
                        border: none;
                    }
                }
                .position {
                    @include flex();
                    justify-content: space-between;
                    font-style: italic;
                }
            }
            .block_two {
                display: grid;
                grid-template-columns: calc(50% - 25px) calc(50% - 25px);
                grid-column-gap: 50px;
                margin-bottom: 40px;
                .formItem {
                    height: 40px;
                }
            }
            .form_button {
                @include flex();
                justify-content: flex-end;
                input {
                    @include button();
                    padding: 8px 25px;
                }
                .buttonCancel {
                    @include buttonHover();
                    padding: 7px 25px;
                    margin-right: 20px;
                }
                .buttonCancel:hover {
                     @include button();
                }
                .buttonSave:hover {
                    padding: 7px 24px;
                    @include buttonHover();
                }
            }
        }
        .modal-content {
            width: 40%;
            background: #fff;
            padding: 40px;
            .content-headline {
                width: calc(100%-80px);
                h1 {
                    text-align: center;
                    margin: 0;
                }
            }
            .content-text {
                p {
                    margin: 25px 0;
                }
            }
            .content-input {
                width: 100%;
                height: 150px;
                textarea {
                    width: calc(100% - 20px);
                    height: calc(100% - 20px);
                    resize: none;
                    font-family: inherit;
                    padding: 10px;
                    border: 1px solid $colorBlue;
                    background: rgba(18, 112, 181, 0.1);
                    outline: none;
                    font-size: 15px;
                }
            }
            .content-button {
                @include flex();
                justify-content: flex-end;
                margin-top: 25px;
                input {
                    @include button();
                    padding: 8px 25px;
                }
                .buttonCancel {
                    @include buttonHover();
                    padding: 7px 25px;
                    margin-right: 20px;
                }
                .buttonCancel:hover {
                     @include button();
                }
                .buttonSave:hover {
                    padding: 7px 24px;
                    @include buttonHover();
                }
            }
        }
    }
}
</style>