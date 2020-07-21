<template>
    <div class="productItem">
        <p v-if="!productionEditing">{{prod.serial_number}}</p>
        <p v-else><input type="text" v-model="prod.serial_number"></p>
        <p v-if="!productionEditing">{{prod.name}}</p>
        <p v-else><input type="text" v-model="prod.name"></p>
        <p v-if="!productionEditing">{{prod.ingredients}}</p>
        <p v-else><input type="text" v-model="prod.ingredients"></p>
        <p v-if="!productionEditing">{{prod.contraindications}}</p>
        <p v-else><input type="text" v-model="prod.contraindications"></p>
        <p class="date" v-if="!productionEditing">{{prod.valid_from}}<br>-<br>{{prod.valid_to}}</p>
        <p v-else><input type="date" v-model="prod.valid_from"><br>-<br><input type="text" v-model="prod.valid_to"></p>
        <div class="option">
            <img src="../assets/image/del.svg" alt="" class="delete" @click="deleteProduct()"> 
            <img src="../assets/image/change.svg" alt="" class="change" v-if="!productionEditing" @click="productionEditing =!productionEditing">
            <img src="../assets/image/add_24px.svg" alt="" class="change" v-else @click="addChanges(),productionEditing =!productionEditing">
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductItem',
    props: ['prod'],
    data(){
        return{
            productionEditing: false,

        }
    },
    methods:{
        deleteProduct(){
            this.$store.dispatch('deleteProduct',{
                id: this.prod.id
            })
            .then(() => {
                this.$store.dispatch('axiosProduct')
            })
        },
        addChanges(){
            this.$store.dispatch('addChangesProd',{
                id: this.prod.id,
                user: localStorage.getItem('id'),
                serial_number: this.prod.serial_number,
                name: this.prod.name,
                ingredients: this.prod.ingredients,
                quantity: this.prod.quantity,
                production_date: this.prod.production_date
            })
        }
    }
}
</script>

<style lang="scss">
@import "../assets/mixin/_mixin.scss";

.productItem {
    width: 100%;
    min-height: 60px;
    display: grid;
    grid-template-columns: minmax(100px, 180px) minmax(190px, 300px) minmax(190px, 330px) minmax(190px, 300px) minmax(80px, 155px) minmax(20px, 25px);
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
    .date {
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