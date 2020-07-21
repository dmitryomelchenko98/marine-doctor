<template>
    <div class="sales">
        <div class="sales-headline">
            <h1>Продажи</h1>
            <div class="header-search">
                <form action="" @submit.prevent="searchSale()">
                    <input type="search" name="" id="search" placeholder="Введите для поиска" v-model="searchs">
                    <input type="submit" value="Поиск" class="button">
                </form>
            </div>
            <button @click="addItem = !addItem">Добавить позицию</button>
        </div>
        <div class="sales-content">
            <div class="content-filter">
                <div class="filter-headline">
                    <h1>Фильтрация</h1>
                </div>
                <form action="" @submit.prevent="filterSale()">
                    <div class="form-item number">
                        <div class="item-headline">
                            <span>По дате</span>
                        </div>
                        <div class="item-input">
                            <label for="from">С</label>
                            <input type="date" name="from" id="from" v-model="production_date_min">
                        </div>
                        <div class="item-input">
                            <label for="by">По</label>
                            <input type="date" name="by" id="by" v-model="production_date_max">
                        </div>
                    </div>
                    <div class="form-item number">
                        <div class="item-headline">
                            <span>По количеству</span>
                        </div>
                        <div class="item-input">
                            <label for="NumbFrom">От</label>
                            <input type="number" name="NumbFrom" id="NumbFrom" v-model="quantity_min">
                        </div>
                        <div class="item-input">
                            <label for="NumbBefor">До</label>
                            <input type="number" name="NumbBefor" id="NumbBefor" v-model="quantity_max">
                        </div>
                    </div>
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
                        <input type="button" value="Сбросить" class="buttonOff" @click="axiosSale()">
                    </div>
                </form>
            </div>
            <div class="content-table">
                <div class="tabel-headlineSales">
                    <span>Серийный номер</span>
                    <span>Наименование</span>
                    <span>Дата продажи</span>
                    <span>Количество</span>
                    <span>Цена за ед.</span>
                    <span class="last">Сумма</span>
                </div>
                <div class="tabel-body">
                    <div class="addItemSales" v-show="addItem">
                        <div class="number">
                            <input type="text" name="" id="" v-model="serial_number">
                        </div>
                        <div class="name">
                            <input type="text" name="" id="" v-model="name">
                        </div>
                        <div class="date">
                            <input type="date" name="" id="" v-model="sale_date">
                        </div>
                        <div class="quantity">
                            <input type="number" name="" id="" v-model="quantity">
                        </div>
                        <div class="priceOne">
                            <input type="number" name="" id="" v-model="price">
                        </div>
                        <div class="priceAll">
                            <input type="number" name="" id="" :value="this.quantity*this.price">
                        </div>
                        <div class="option" @click="summa(), addSale(), addItem = false">
                            <img src="../assets/image/gal.png" alt="">
                        </div>
                    </div>
                    <SalesItem v-for="sale in sales" :key="sale" :sale="sale"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SalesItem from '../components/SalesItem.vue'

export default {
    name: 'Sales',
    components: {SalesItem},
    data() {
        return {
            addItem: false,
            serial_number: '',
            name: '',
            sale_date: '',
            quantity: '',
            price: '',
            sum: '',
            production_date: '',
            production_date_min: '',
            production_date_max: '',
            quantity_min: '',
            quantity_max: '',
            name_filter: '',
            serial_number_filter: '',
            searchs: ''
        }
    },
    mounted(){
        this.$store.dispatch('axiosSALES')
    },
    computed: {
        sales() {
            return this.$store.getters.SALES.filter(prod => prod.user == localStorage.getItem('id'))
        }
    },
    methods: {
        axiosSale(){
            this.$store.dispatch('axiosSALES')
        },
        summa() {
            this.sum = this.quantity*this.price
        },
        addSale(){
            this.$store.dispatch('SALESAdd',{
                user: localStorage.getItem('id'),
                serial_number: this.serial_number,
                name: this.name,
                sale_date: this.sale_date,
                quantity: this.quantity,
                price: this.price,
                sum: this.sum
            })
            .then(() => {
                this.$store.dispatch('axiosSALES')
                this.serial_number = this.name = this.sale_date = this.quantity = this.price = this.sum = ''
            })
        },
        filterSale(){
            this.$store.dispatch('filterSale', {
                production_date_min: this.production_date_min,
                production_date_max: this.production_date_max,
                quantity_min: this.quantity_min,
                quantity_max: this.quantity_max,
                name: this.name_filter,
                serial_number: this.serial_number_filter
            })
        },
        searchSale(){
            this.$store.dispatch('searchSale', {
                search: this.searchs
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

.sales {
    @include content();
    .sales-headline {
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
    .sales-content {
        width: 100%;
        height: calc(100% - 69px);
        @include contentPage();
        .content-filter {
            @include contentItem();
            @include filter();
            form {
                .number {
                    .item-input {
                        display: flex;
                        align-items: center;
                        label {
                            width: 45px;
                            height: 10px !important;
                        }
                        input {
                            width: calc(99% - 45px);
                        }
                    }
                }
                .form-item {
                    margin-bottom: 15px !important;
                }
            }
        }
        .content-table {
            @include contentItem();
            .tabel-headlineSales {
                width: 100%;
                display: grid;
                grid-template-columns: minmax(100px, 180px) minmax(180px, 270px) minmax(140px, 230px) minmax(110px, 210px) minmax(120px, 220px) minmax(80px, 155px) minmax(20px, 25px);
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
                .last {
                    border-right: none;
                    grid-column: 6/8;
                }
            }
            .tabel-body {
                width: 100%;
                height: calc(100% - 72px);
                overflow-y: auto;
                
                .productItem:last-child {
                    border-bottom: none;
                }
                .addItemSales {
                    width: 100%;
                    display: grid;
                    grid-template-columns: minmax(100px, 180px) minmax(180px, 270px) minmax(140px, 230px) minmax(110px, 210px) minmax(120px, 220px) minmax(80px, 155px) minmax(20px, 25px);
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
                    .priceAll {
                        border-right: none;
                    }
                }
            }
        }
    }
}
</style>