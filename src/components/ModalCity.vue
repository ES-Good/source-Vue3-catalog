<template>
  <div class="overlay" 
  @click.self="closeModalCity">
    <div class="popup-city" 
          :class="{ 'active-popap': showPopup }">
      <button 
      @click="closeModalCity" 
      class="btn-close btn-close_popup-city">Close</button>

      <p class="title-lvl-3 title-lvl-3_popup-city">
        Выбор населённого пункта: 
      </p>

      <div class="popup-city__inner">
        <div class="popup-city__input-wrapper" 
              :class="{'border-style': arrCity.length >= 3}">

          <input 
          v-model="termUser" 
          type="text" placeholder="Например, Санкт-петербург">

          <button class="popup-city__clear-input-city" 
          @click="clearInputCity"
          v-show="arrCity.length >= 3">Clear input</button>

          <ul 
          v-show="arrCity.length >= 3" 
          class="city-list">

            <li 
            v-for="cityUser in arrCity" 
            @click="choiceCity(cityUser.id, cityUser.label, cityUser.city)"
            :key="cityUser.id"> {{ cityUser.label }}</li>

          </ul>
        </div>

        <button class="popup-city__btn" @click="confirmationInputCity" :disabled="!idCity">
          Подтвердить
        </button>
      </div>
    </div>
  </div>
</template>

<script> 
import {mapMutations, mapGetters, mapActions} from 'vuex';
export default {
    name: 'ModalCity',
    data(){
      return{
        termUser: '',
        idCity: '',
        nameCityModal: '',
        arrCity: [],
      }
    },
    watch:{
      termUser: function(){
        if(this.termUser.length >= 3 ){
          fetch(`https://nlstar.com/api/catalog3/v1/city/?term=${this.termUser}&country=ru`)
            .then(data => data.json())
            .then(citys => {
              this.arrCity = citys.data.slice()
            })
        }else{
          this.clearModal()
        }
      }
    },
    methods:{
      ...mapMutations(["closeModalCity", "updateCityId", "renameCityBtn"]),
      ...mapActions(["fetchCategories"]),

      clearInputCity(){
        this.termUser = ''
      },
      choiceCity(id, nameCity, nameCityBtnHeader){
        this.termUser = nameCity
        this.arrCity = []
        this.idCity = id
        this.nameCityModal = nameCityBtnHeader
        this.updateCityId(id)
      },

      addLocalStorage(){
        localStorage.setItem('cityId', this.idCity );
        localStorage.setItem('cityName', this.nameCityModal );
      },

      clearModal(){
        this.arrCity = []
        this.idCity = ''
      },

      confirmationInputCity(){
        this.addLocalStorage()

        this.fetchCategories()

        this.closeModalCity()

        this.clearModal()
        this.termUser = ''

        this.renameCityBtn(this.nameCityModal)
      }
    },
    computed:{
      ...mapGetters(["modalCity", "chackInputUser"]),

      showPopup(){
        if (this.modalCity) {
          return true
        }else {
          return false
        }
      }
    }
}
</script>

<style>

.overlay{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(53, 54, 71, 0.8);
}

.popup-city{
  background-color: #fff;
  max-width: 770px;
  width: 100%;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-200%);
  padding: 28px 18px 32px;
  /* transition: transform 6s; */
  height: 144px;
}
.popup-city__btn-close{
  font-size: 0;
}

.btn-close_popup-city{
  top: 18px;
  right: 18px;
}

.popup-city__inner{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 48px;
}

.popup-city__input-wrapper{
  width: calc(75% - 9px);
  padding: 12px 16px;
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: 5px;
  position: relative;
  background-color: #fff;
}

.border-style{
  border: 1px solid #272727;
}

.city-list{
  background-color: #fff;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
  padding-top: 12px;
  position: relative;
}

.city-list::after{
  content: '';
  position: absolute;
  width: 95%;
  height: 2px;
  background: rgba(151, 151, 151, 0.3);
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.city-list li{
  margin-bottom: 8px;
  cursor: pointer;
}

.city-list li:hover{
  color: #000;
}

.city-list::-webkit-scrollbar{
  display: none;
  width: 0;
}

.popup-city__btn{
  width: calc(25% - 9px);
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 24px;
  cursor: pointer;
  text-align: center;
  padding: 12px 0;
  color: #fff;
  background: linear-gradient(270deg, #FFA800 0%, #FF6F00 60.2%);
  border: 2px solid transparent;
  box-shadow: 0px 10px 10px rgba(151, 151, 151, 0.2)
}

.popup-city__btn[disabled]{
  color: #ACACAC;
  background: transparent;
  border: 2px solid rgba(151, 151, 151, 0.3);
  box-shadow: none;
}

.popup-city__input-wrapper input{
  border: none;
  width: 100%;
  font-size: 18px;
}

.popup-city__input-wrapper input:focus{
  outline: none;
}

.title-lvl-3_popup-city{
  font-weight: 600;
  margin-bottom: 16px;
}

.active-popap{
  animation-name: showPopupCity;
  animation-duration: .5s;
  animation-fill-mode: forwards;
}

.border-style.popup-city__input-wrapper input{
  padding-bottom: 14px;
}

.popup-city__clear-input-city{
  position: absolute;
  width: 16px;
  height: 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0;
  right: 15px;
  top: 15px;
}

.popup-city__clear-input-city:after,
.popup-city__clear-input-city:before{
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #979797;
}

.popup-city__clear-input-city:after{
  transform: translateY(-50%) rotate(45deg);
}

.popup-city__clear-input-city:before{
  transform: translateY(-50%) rotate(-45deg);
}

@keyframes showPopupCity {
  0% {
    transform: translate(-50%, -200%);
    opacity: 0;
  }
  100%{
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}



</style>