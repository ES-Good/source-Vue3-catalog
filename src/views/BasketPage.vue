<template>
  <div class="container">
    <ul class="basket-list" v-show="basket">
        <li class="basket-list__item" v-for="item in basket" :key="item.id">
            <p class="basket-list__name">
                {{ item.short_name }}
            </p>
            <p class="basket-list__count"> {{ item.counter }} шт.</p>
            <button 
            @click="deleteProductBasket(item)" 
            class="btn-close btn-close_item-product">
            Close</button>
        </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    name:'BasketPage',

    methods:{
        ...mapMutations(["renameBigTitlePage","deleteProductBasket"])
    },

     computed:{
        ...mapGetters(["basket","basketCount", "sumAllProduct"])
    },

    mounted() {
        this.renameBigTitlePage('Корзина')
    }
}
</script>

<style>
.basket-list{
    width: 100%;
    list-style: none;
}

.basket-list__item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 20px;
    border-bottom: 1px solid darkgray;

}

.basket-list__name{
    font-size: 20px;
    font-weight: 600;
}

.basket-list__count{
    font-size: 18px;

}

@media screen and (max-width: 576px) {
    .basket-list__name{
        font-size: 16px;
    }

    .basket-list__item{
        padding-left: 0;
    }

    .basket-list__count{
        font-size: 14px;
    }
}

</style>