<template>
    <div class="card-product" v-for="card in cardsProduct" :key="card.id" >

        <CardHeader :srcImgProduct="card.image"/>
        
        <div class="card-product__content">
            <p class="card-product__text card-product__text_pale">{{ card.category.name }}</p>
            <p class="card-product__text card-product__text_name">{{ card.present_name }}</p>
            <p v-if="card.present_name != card.comment_name" 
            class="card-product__text card-product__text_description">{{ card.comment_name }}</p> 
            <p class="card-product__text card-product__text_price card-product__text_price-ru">{{ card.price }}</p>

            <CardFooter  
            @clickBtn="clickCardBtn(card)"
            :allowed="card.allowed" 
            :available="card.available"/>

        </div>
    </div>
</template>

<script>
import CardFooter from '../components/CardFooter.vue';
import CardHeader from '../components/CardHeader.vue';
import {mapMutations} from 'vuex';

export default {
    name: 'CardProduct',
    components:{
        CardFooter,
        CardHeader
    },

    methods:{
        ...mapMutations(["addToBasket"]),
        dowlandImg(card){
            card.loadImg = true
        },
        clickCardBtn(price){
            this.addToBasket(price)
        }
    },

    props:{
        cardsProduct: Array
    }
}
</script>

<style>

</style>