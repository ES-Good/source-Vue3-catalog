<template>
  <div class="container">
    <div class="categories-wrapper">
      <router-link :to="{ name: 'cardCategory', params: { slug: card.slug } }" class="categories-card" v-for="card in allCategories" :key="card.id" :style="{ backgroundImage: `url(${card.image})` }">
        <h5 class="categories-card__title" :style="{ color: card.text_color }">{{ card.name }}</h5>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'HelloWorld',

  methods:{
    ...mapActions(["fetchCategories"])
  },

  computed:{
    ...mapGetters(["allCategories"]),
  },

  mounted(){
    this.fetchCategories()
  },

}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  text-decoration: none;
}

.categories-wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
}

.categories-card{
  width: calc(100% / 4 - 16px);
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  cursor: pointer;
  transition: transform .5s, box-shadow .5s;
  height: 150px;
  margin-bottom: 20px;
  margin-right: 16px;
  border-radius: 5px;
}

.categories-card:hover{
  transform: translateY(-5px);
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.5);
}

.categories-card__title{
  font-size: 24px;
}

@media screen and (max-width: 1070px){
  .categories-card{
    width: calc(100% / 3 - 16px);
  }
}

@media screen and (max-width: 890px){
  .categories-card{
    width: calc(100% / 2 - 16px);
  }
}

@media screen and (max-width: 576px){
  .categories-card{
    width: calc(100% / 2 - 8px);
    background-position-x: 88%;
  }
  .categories-card:nth-child(2n){
    margin-right: 0;
  }

  .categories-card__title{
    font-size: 14px;
  }
}
</style>
