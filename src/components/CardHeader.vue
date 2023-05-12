<template>
   <div class="card-product__img-box">
        <img :src="srcImgProduct" v-show="loadImg" class="card-product__img" @load="imgLoaded">
        <div v-show="!loadImg" class="loader-card">loading</div>
    </div>
</template>

<script>
export default {
    name:"CardHeader",
    props: {
        srcImgProduct: String
    },

    data(){
        return{
            loadImg: false
        }
    },

    methods:{
        imgLoaded(){
            this.loadImg = true
        }
    }
}
</script>

<style>

</style>