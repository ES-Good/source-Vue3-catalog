import { createStore } from 'vuex'

export default createStore({
  state: {

    categories: [],
    openModalCity: false,
    nameCity: '',
    cityId: '',
    preloader: false,
    mainTitlePage: ''
  },

  mutations: {

    updateCityId(state,id){
      state.cityId = id
    },

    updateCategories(state, categoriesFetch){
      state.categories = categoriesFetch
    },

    clearCategories(state){
      state.categories = []
    },

    closeModalCity(state){
      state.openModalCity = false;
      document.querySelector('body').classList.remove('open-modal')
    },

    openModalCity(state){
      state.openModalCity = true;
      document.querySelector('body').classList.add('open-modal')
    },

    renameCityBtn(state, name){
      state.nameCity = name
    },

    chackCityLocalStorage(state){
      if (!!localStorage.getItem('cityId')) {
        state.cityId = localStorage.getItem('cityId')
        state.nameCity = localStorage.getItem('cityName')
      }
    },

    showPreloader(state){
      state.preloader = true;
    },

    closePreloader(state){
      state.preloader = false;
    },

    renameBigTitlePage(state, string){
      if (string == '') {
        state.mainTitlePage = 'Все продукты'
      }else{
        state.mainTitlePage = string
      }
    }
    
  },

  getters:{

    allCategories(state){
      return state.categories
    },
    
    modalCity(state){
      return state.openModalCity
    },

    nameCity(state){
      return state.nameCity
    },

    chackInputUser(state){
      return state.nameCity
    },

    preloaderStatus(state){
      return state.preloader
    },

    mainTitlePage(state){
      return state.mainTitlePage
    },

    cityIdState(state){
      if (!!localStorage.getItem('cityId')) {
        state.cityId = localStorage.getItem('cityId')
        state.nameCity = localStorage.getItem('cityName')
      }
      return state.cityId
    }
  },

  actions: {

    async fetchCategories(ctx){
      let response = [];
      ctx.commit('clearCategories')
      ctx.commit('showPreloader')
      ctx.commit('chackCityLocalStorage')

      if (!this.state.cityId) {
        response = await fetch('https://nlstar.com/ru/api/catalog3/v1/menutags/?city_id=1');
      }else{
        response = await fetch(`https://nlstar.com/ru/api/catalog3/v1/menutags/?city_id=${this.state.cityId}`);
      }
      let categoriesData = await response.json()
      ctx.commit('updateCategories', categoriesData.tags)
      ctx.commit('closePreloader')
    }

  }
})
