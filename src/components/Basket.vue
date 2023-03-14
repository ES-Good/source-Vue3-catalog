<template>
    <div class="basket-box">
        <button class="basket-box__btn" :data-count-basket="basketCount" @click="basketOpen = true">
            <img src="@/assets/img/basket-ico.svg" alt="">

            <div class="basket-box__count">
                <p>
                    {{ basketCount }}
                </p>
            </div>
        </button>

        <div class="basket-box__product-container" v-show="basketOpen">
            <ul class="basket-box__product-list" v-show="basket">
                <li class="basket-box__item" v-for="item in basket" :key="item.id">
                    <p class="basket-box__name">
                        {{ item.short_name }}
                    </p>
                    <p class="basket-box__count-product"> {{ item.counter }} шт.</p>
                </li>
            </ul>
            <p v-show="basket.length == 0">Корзина пуста</p>
             <router-link to="/" class="basket-box__link-basket">
                Перейти в корзину
            </router-link>
            <button 
            @click="basketOpen = false" 
            class="btn-close btn-close_basket">Close</button>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'Basket',

    data(){
        return{
            basketOpen: false,
        }
    },

    computed:{
        ...mapGetters(["basket","basketCount"])
    }
}
</script>

<style>

.basket-box{
    position: relative;
}

.basket-box__name{
    width: calc(100% - 14%);
}

.basket-box__count-product{
    width: 14%;
}

.basket-box__product-list{
    list-style: none;
    overflow-y: auto;
    max-height: 300px;
}

.basket-box__product-list::-webkit-scrollbar {
  display: none;
}

.basket-box__item{
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    border-bottom: 1px solid #979797;
    padding: 10px 0;
}

.basket-box__item:last-child{
    border-bottom: none;
}

.basket-box__product-container{
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(100%);
    background-color: #fff;
    border: 1px solid #000;
    width: 375px;
    z-index: 99;
    padding: 10px;
    padding-bottom: 60px;
}

.basket-box__btn{
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    margin-right: 20px;
}

.basket-box__count{
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background-color: red;
    border-radius: 50%;
    transform: translate(100%, -50%);
}

.basket-box__count p{
    position: absolute;
    color: #fff;
    font-weight: 900;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    line-height: 12px;
    width: 100%;
    text-align: center;
}

.basket-box__link-basket{
    position: absolute;
    text-align: center;
    background-color: red;
    color: #fff;
    text-decoration: none;
    padding: 10px 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.btn-close_basket{
    top: 10px;
    right: 10px;
}

</style>