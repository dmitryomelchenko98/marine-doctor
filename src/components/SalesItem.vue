<template>
    <div class="salesItem">
        <p v-if="!productionEditing">{{sale.serial_number}}</p>
        <p v-else><input type="text" v-model="sale.serial_number"></p>
        <p v-if="!productionEditing">{{sale.name}}</p>
        <p v-else><input type="text" v-model="sale.name"></p>
        <p v-if="!productionEditing">{{sale.sale_date}}</p>
        <p v-else><input type="text" v-model="sale.sale_date"></p>
        <p v-if="!productionEditing">{{sale.quantity}} шт.</p>
        <p v-else><input type="text" v-model="sale.quantity"></p>
        <p v-if="!productionEditing">{{sale.price}}р</p>
        <p v-else><input type="text" v-model="sale.price"></p>
        <p class="last" v-if="!productionEditing">{{sale.quantity*sale.price}}р</p>
        <p v-else><input type="text" v-model="sale.quantity"> * <input type="text" v-model="sale.price"></p>
        <div class="option">
            <img src="../assets/image/del.svg" alt="" class="delete" @click="deleteSale()">
            <img src="../assets/image/change.svg" alt="" class="change" v-if="!productionEditing" @click="productionEditing =!productionEditing">
            <img src="../assets/image/add_24px.svg" alt="" class="change" v-else @click="addChanges(),productionEditing =!productionEditing">
        </div>
    </div>
</template>

<script>
export default {
    name: 'SalesItem',
    props: ['sale'],
    data(){
        return{
            productionEditing: false,
        }
    },
    methods:{
        deleteSale(){
            this.$store.dispatch('deleteSale',{
                id: this.sale.id
            })
            .then(() => {
                this.$store.dispatch('axiosSALES')
            })
        },
        addChanges(){
            this.$store.dispatch('addChangesSale',{
                id: this.sale.id,
                user: localStorage.getItem('id'),
                serial_number: this.sale.serial_number,
                name: this.sale.name,
                ingredients: this.sale.ingredients,
                quantity: this.sale.quantity,
                production_date: this.sale.production_date
            })
        }
    }
}
</script>

<style lang="scss">
@import "../assets/mixin/_mixin.scss";

.salesItem {
    width: 100%;
    min-height: 60px;
    display: grid;
    grid-template-columns: minmax(100px, 180px) minmax(180px, 270px) minmax(140px, 230px) minmax(110px, 210px) minmax(120px, 220px) minmax(80px, 155px) minmax(20px, 25px);
    text-align: center;
    align-items: center;
    border-bottom: 1px solid rgba(196, 196, 196, 0.8);
    p {
        border-right: 1px solid rgba(196, 196, 196, 0.8);
        height: calc(100% - 20px);
        width: calc(100% - 20px);
        padding: 10px;
        font-size: 14px;
        margin: 0;
        @include flex();
    }
    span:last-child {
        border-right: none;
    }
    .last {
        border-right: none;
    }
    .option {
        .delete {
            margin-bottom: 5px;
        }
        .delete, .change {
            cursor: pointer;
        }
    }
}
</style>