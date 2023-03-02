<template>
    <div class="detal-card-wrapper__aside">

        <select v-show="mobileWindow" @change="$emit('choiceCategoryMobile', mobileCategory)" v-model="mobileCategory" class="mobile-category-select">
            <option v-for="tag in filterBtns" :key="tag.id" :value="tag.id">
                {{ tag.name }}
            </option>
        </select>

        <ul v-show="!mobileWindow" class="category-list">
            <li class="category-list__item" :class="{ 'category-list__item_active': tag.click}" v-for="tag in filterBtns" :key="tag.id" @click="$emit('clickCategoryItem', tag)">
                {{ tag.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CategoryNav',
    props:{
        filterBtns: Array
    },
    emits: ['clickCategoryItem','choiceCategoryMobile'],
    data(){
        return {
            mobileCategory: 'AllCategories'
        }
    },
    computed:{
        mobileWindow(){
            return window.innerWidth <= 576
        }
    }
}
</script>

<style>

</style>