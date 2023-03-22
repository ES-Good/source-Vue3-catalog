<template>
  <div class="container-fluid">
    <header class="header">
      <div class="container container_header">
        <button class="city-btn" @click="openModalCity">
          <img src="@/assets/img/marker-city.svg" alt="">
          {{ checkStartCityName }}
        </button>
        <Basket/>
        {{basketCount}}
      </div>
    </header>

    <TopBlock/>
    
    <router-view/>
    <ModalCity v-show="modalCity"/>
    <div v-show="preloaderStatus" class="loader-box">
      <div class="loader">loading</div>
    </div>
  </div>
</template>


<script>
import {mapMutations, mapGetters} from 'vuex';
import Basket from './components/Basket.vue';
import ModalCity from './components/ModalCity.vue';
import TopBlock from './components/TopBlock.vue';

export default {
  components:{
    ModalCity,
    TopBlock,
    Basket
  },
  methods:{
    ...mapMutations(["openModalCity", "renameBigTitlePage"])
  },
  computed:{
    ...mapGetters(["modalCity", "nameCity","preloaderStatus","mainTitlePage", "cityIdState"]),

    checkStartCityName(){
      if (!this.nameCity) {
        return 'Новосибирск'
      }else{
        return this.nameCity
      }
    }
  },

  updated() {
    if (!this.$route.params.slug) {
      this.renameBigTitlePage('')
    }
  },
}
</script>

<style>
@import "./assets/css/style.css";

</style>
