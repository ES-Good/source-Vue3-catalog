<template>
    <div class="container">
        <div class="detal-card-wrapper">
            <CategoryNav 
            v-show="showAsideNavCategore"
            :filterBtns="filterBtn" 
            @choiceCategoryMobile="showProductMobile"
            @clickCategoryItem="choiceCategory"/>

            <div class="detal-card-wrapper__cards-conainer" :class="{'w-100' : !showAsideNavCategore}">
                <div v-if="!detalCategory.length" class="detal-card-wrapper__header">
                    <p class="detal-card-wrapper__title">
                        Нет товара &#9785;
                    </p>
                </div>

                <CardProduct :cardsProduct="detalCategory" />
                
            </div>
        </div>
    </div>
</template>

<script>

import {mapMutations, mapGetters} from 'vuex';
import CardProduct from '../components/CardProduct.vue';
import CategoryNav from '../components/CategoryNav.vue';
import { fetchAllCategoryProduct } from "../fetchCategory.js";

export default {
    components: { 
        CategoryNav,
        CardProduct 
    },
    data(){
        return{
            detalCategory: [],
            allDetalCategory: [],
            filterBtn: []
        }
    },
    methods:{
        ...mapMutations(["showPreloader", "closePreloader", "renameBigTitlePage"]),

        choiceCategory(tag){
           
            this.filterBtn.forEach(element => {
                element.click = false
            });

            tag.click = true
            
            if (tag.id != 'AllCategories') {

                let newArrCategory = this.allDetalCategory.filter(item => {
                    return item.tags.some(i => i.id == tag.id)
                })

                this.detalCategory = newArrCategory
                
                newArrCategory = []

            }else{
                this.detalCategory = this.allDetalCategory
            }

        },

        showProductMobile(id){
                
                if (id != 'AllCategories') {
                    let newArrCategory = this.allDetalCategory.filter(item => {
                        return item.tags.some(i => i.id == id)
                    })

                    this.detalCategory = newArrCategory
                    
                    newArrCategory = []

                }else{
                    this.detalCategory = this.allDetalCategory
                }
                
        }

    },
    computed:{
        ...mapGetters(["allCategories", "cityIdState"]),

        showAsideNavCategore(){
            if (this.filterBtn.length >= 3) {
                return true
            }else{
                return false
            }
        }
    },

    async mounted(){
        this.showPreloader()
        let allProductData = await fetchAllCategoryProduct(this.$route.params.slug ,this.cityIdState)

        this.allDetalCategory = allProductData.products

        this.detalCategory = this.allDetalCategory

        this.filterBtn = allProductData.tags
        
        if (allProductData) {
            this.closePreloader()
        }
    },

    updated() {
        if (!this.$route.params.slug) {
        this.renameBigTitlePage('')
        }else{
        fetch(`https://nlstar.com/ru/api/catalog3/v1/menutags/${this.$route.params.slug}/?city_id=${this.cityIdState}`)
            .then(response => response.json())
            .then(data => {
                this.renameBigTitlePage(data.tags[0].name)
            })
        }
    },

}
</script>

<style>

.detal-card-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.detal-card-wrapper__cards-conainer{
    display: flex;
    flex-wrap: wrap;
    width: 70%;
}

.detal-card-wrapper__aside{
    width: 25%;
}

.category-list{
    list-style: none;
}

.category-list__item{
    width: 100%;
    padding: 8px 12px;
    border-bottom: 1px solid #E9EEF3;
    line-height: 24px;
    cursor: pointer;
    transition: background-color .2s;
}

.category-list__item:hover{
    background-color: #E9EEF3;
}

.category-list__item_active{
    background-color: #E9EEF3;
}

.card-product{
    width: calc(100% / 3 - 16px);
    margin-right: 24px;
    margin-bottom: 24px;
    background-color: #fff;
    position: relative;
    padding-bottom: 48px;
}

.card-product:nth-child(3n){
    margin-right: 0;
}

.card-product__img{
    width: 100%;
    position: absolute;
    object-fit: cover;
    object-position: center;
}

.card-product__content{
    padding: 0 10px 18px;
}

.card-product__text{
    text-align: center;
}

.card-product__text_pale{
    color: #979797;
    font-size: 14px;
    margin-bottom: 4px;
}

.card-product__text_name{
    font-size: 20px;
    line-height: 24px;
    color: #272727;
    font-weight: 600;
    margin-bottom: 8px;
}

.card-product__text_description{
    line-height: 20px;
    margin-bottom: 14px;
}

.card-product__text_price{
    color: #272727;
    font-weight: 600;
    font-size: 26px;
    line-height: 24px;
    margin-bottom: 16px;
}

.card-product__text_price-ru:after{
    content: '\20BD';
    margin-left: 6px;
}

.card-product__btn{
    background: linear-gradient(270deg, #FFA800 0%, #FF6F00 100%);
    color: #fff;
    max-width: 212px;
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: 18px;
    line-height: 24px;
    border-radius: 24px;
    border: none;
    cursor: pointer;
    box-shadow: 0px 8px 11px #ffa800;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.card-product__btn[disabled]{
    border: 2px solid rgba(151, 151, 151, 0.3);
    background: #fff;
    color: rgba(39, 39, 39, 0.5);
    box-shadow: none;
}

.card-product__btn[disabled]:hover{
    cursor: auto;
}

.card-product__img-box{
    width: 100%;
    position: relative;
    padding-bottom: 100%;
    overflow: hidden;
}

.detal-card-wrapper__header{
    width: 100%;
}

.detal-card-wrapper__title{
    text-align: center;
    font-size: 24px;
    font-weight: 600;
}

.loader-card,
.loader-card:before,
.loader-card:after {
  background: #65abf8;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader-card {
  color: #65abf8;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0) translate(-50%, -50%);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  position: absolute;
  top: 16%;
  left: 50%;
}
.loader-card:before,
.loader-card:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader-card:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader-card:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}

.w-100{
    width: 100% !important;
}

@media screen and (max-width: 1080px){
    .card-product{
        width: calc(100% / 2 - 16px);
    }

    .card-product:nth-child(3n){
        margin-right: 20px;
    }

    .card-product:nth-child(2n){
        margin-right: 0;
    }
}

@media screen and (max-width: 992px){
    .detal-card-wrapper__aside{
        width: 40%;
        position: sticky;
        top: 10px;
        z-index: 10;
    }

    .detal-card-wrapper__cards-conainer{
        width: 60%;
    }

    .card-product{
        width: 100%;
        margin-right: 0;
    }

    .card-product:nth-child(3n){
        margin-right: 0;
    }

    .card-product:nth-child(2n){
        margin-right: 0;
    }
}

@media screen and (max-width: 992px){
    .detal-card-wrapper{
        flex-wrap: wrap;
    }

    .detal-card-wrapper__aside,
    .detal-card-wrapper__cards-conainer{
        width: 100%;
    }

    .detal-card-wrapper__aside{
        margin-bottom: 14px;
    }

    .mobile-category-select{
        width: 100%;
        padding: 10px;
        box-shadow: 0px 2px 4px rgb(39 39 39 / 10%);
        border: none;
    }
}

</style>