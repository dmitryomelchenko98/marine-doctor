<template>
    <div class="product">
        <div class="product-headline">
            <h1>Продукция</h1>
            <div class="header-search">
                <form action="" @submit.prevent="searchProduct()">
                    <input type="search" name="" id="search" placeholder="Введите для поиска" v-model="searchPro">
                    <input type="submit" value="Поиск" class="button">
                </form>
            </div>
            <button @click="addItem = !addItem">Добавить продукт</button>
        </div>
        <div class="product-content">
            <div class="content-filter">
                <div class="filter-headline">
                    <h1>Фильтрация</h1>
                </div>
                <form action="" @submit.prevent="filterProduct()">
                    <div class="form-item">
                        <div class="item-headline">
                            <span>По названию</span>
                        </div>
                        <div class="item-input">
                            <input type="search" name="searchName" id="searchName" placeholder="Поиск" v-model="name_filter">
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="item-headline">
                            <span>По серийному номеру</span>
                        </div>
                        <div class="item-input">
                            <input type="search" name="searchNumb" id="searchNumb" placeholder="Поиск" v-model="serial_number_filter">
                        </div>
                    </div>
                    <div class="formButton">
                        <input type="submit" value="Применить" class="buttonSub">
                        <input type="button" value="Сбросить" class="buttonOff" @click="axiosProduct()">
                    </div>
                </form>
            </div>
            <div class="content-table">
                <div class="tabel-headline">
                    <span>Серийный номер</span>
                    <span>Наименование</span>
                    <span>Ингредиенты</span>
                    <span>Противопоказания</span>
                    <span class="date">Срок годности</span>
                </div>
                <div class="tabel-body">
                    <div class="addItem" v-show="addItem">
                        <div class="number">
                            <input type="text" name="" id="" v-model="serial_number">
                        </div>
                        <div class="name">
                            <input type="text" name="" id="" v-model="name">
                        </div>
                        <div class="ingredients">
                            <input type="text" name="" id="" v-model="ingredients">
                        </div>
                        <div class="contraindications">
                            <input type="text" name="" id="" v-model="contraindications">
                        </div>
                        <div class="date">
                            <input type="date" name="" id="" v-model="valid_from">
                            <input type="date" name="" id="" v-model="valid_to">
                        </div>
                        <div class="option" @click="addProduct(), addItem = false">
                            <img src="../assets/image/gal.png" alt="">
                        </div>
                    </div>
                    <ProductItem v-for="prod in Product" :key="prod" :prod="prod"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue'

export default {
    name: 'Product',
    components: {ProductItem},
    data() {
        return {
            addItem: false,
            serial_number: '',
            name: '',
            ingredients: '',
            contraindications: '',
            valid_from: '',
            valid_to: '',
            name_filter: '',
            serial_number_filter: '',
            searchPro: ''
        }
    },
    mounted(){
        this.$store.dispatch('axiosProduct')
    },
    computed: {
        Product(){
            return this.$store.getters.product
        }
    },
    methods: {
        axiosProduct(){
            this.$store.dispatch('axiosProduct')
        },
        addProduct(){
            this.$store.dispatch('PRODUCTAdd',{
                serial_number: this.serial_number,
                name: this.name,
                ingredients: this.ingredients,
                contraindications: this.contraindications,
                valid_from: this.valid_from,
                valid_to: this.valid_from
            })
            .then(() => {
                this.$store.dispatch('axiosProduct')
                this.serial_number = this.name = this.ingredients = this.contraindications = this.valid_from = this.valid_to = ''
            })
        },
        filterProduct(){
            this.$store.dispatch('filterProduct', {
                name: this.name_filter,
                serial_number: this.serial_number_filter
            })
        },
        searchProduct(){
            this.$store.dispatch('searchProduct', {
                search: this.searchPro
            })
        }
    }
}
</script>

<style lang="scss">
@import "../assets/mixin/_mixin.scss";
::-webkit-scrollbar { 
    width: 0px;  
    background: transparent;  
}

.product {
    @include content();
    .product-headline {
        @include headlinePage();
        .header-search {
            width: 50%;
            form {
                width: 100%;
                #search {
                    width: calc(100% - 130px);
                    padding: 0 10px;
                    height: 30px;
                    background: rgba(18, 112, 181, 0.1);
                    border: 1px solid #1270B5;
                    box-sizing: border-box;
                    outline: none;
                    font-family: inherit;
                }
                .button {
                    width: 110px;
                    height: 30px;
                    margin-left: 20px;
                    @include button();
                }
                .button:hover {
                    @include buttonHover();
                }
            }
            h1 {
                width: 25%;
            }
        }
    }
    .product-content {
        width: 100%;
        height: calc(100% - 69px);
        @include contentPage();
        .content-filter {
            @include contentItem();
            @include filter();
        }
        .content-table {
            @include contentItem();
            .tabel-headline {
                width: 100%;
                display: grid;
                grid-template-columns: minmax(100px, 180px) minmax(190px, 300px) minmax(190px, 330px) minmax(190px, 300px) minmax(80px, 155px) minmax(20px, 25px);
                grid-template-rows: 70px;
                text-align: center;
                align-items: center;
                border-bottom: 1px solid rgba(196, 196, 196, 0.8);
                span {
                    border-right: 1px solid rgba(196, 196, 196, 0.8);
                    height: calc(100% - 20px);
                    width: calc(100% - 20px);
                    padding: 10px;
                    font-family: 'Montserrat Regular';
                    font-weight: bolder;
                    font-size: 14px;
                    @include flex();
                }
                .date {
                    border-right: none;
                    grid-column: 5/7;
                }
            }
            .tabel-body {
                width: 100%;
                height: calc(100% - 72px);
                overflow-y: auto;
                
                .productItem:last-child {
                    border-bottom: none;
                }
                .addItem {
                    width: 100%;
                    display: grid;
                    grid-template-columns: minmax(100px, 180px) minmax(190px, 300px) minmax(190px, 330px) minmax(190px, 300px) minmax(80px, 155px) minmax(20px, 25px);
                    grid-template-rows: 70px;
                    text-align: center;
                    align-items: center;
                    border-bottom: 1px solid rgba(196, 196, 196, 0.8);
                    div {
                        border-right: 1px solid rgba(196, 196, 196, 0.8);
                        height: 100%;
                        width: 100%;
                        margin: 0;
                        @include flex();
                        input{
                            width: 90%;
                            border: none;
                            border-bottom: 1px solid #1270B5;
                            height: 25px;
                            outline: none;
                            font-family: inherit;
                            font-size: 14px;
                        }
                    }
                    .option {
                        border-right: none;
                        img {
                            width: 15px;
                            height: auto;
                            cursor: pointer;
                        }
                    }
                    .date {
                        @include flex();
                        flex-direction: column;
                        border-right: none;
                    }
                }
            }
        }
    }
}
</style>