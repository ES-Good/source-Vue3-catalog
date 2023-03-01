<template>
    <div class="container top-block">

        <div class="top-block__title-container">

            <router-link to="/" v-if="this.$route.params.slug" class="arrow-box">

                <svg class="arrow-box__arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M15.9999 6H2.49988" stroke-width="2"/>
                <path d="M7 1L2 6L7 11" stroke-width="2"/>
                </svg>

            </router-link>
            <h1>{{ mainTitlePage }}</h1>

        </div>

    </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex';

export default {
    name: 'TopBlock',
    methods:{
        ...mapMutations(["renameBigTitlePage"])
    },

    computed:{
        ...mapGetters(["mainTitlePage"])
    }
}
</script>

<style>

.top-block__title-container{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.arrow-box{
    position: relative;
    background-color: #000;
    width: 30px;
    height: 30px;
    border: 1px solid transparent;
    border-radius: 50%;
    transition: background-color .3s, border .3s;
    cursor: pointer;
    margin-right: 14px;
}

.arrow-box__arrow{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.arrow-box__arrow path{
    stroke: #fff;
    transition: stroke .3s;
}

.arrow-box:hover{
    background-color: #fff;
    border: 1px solid #000;
}

.arrow-box:hover .arrow-box__arrow path{
    stroke: #000;
}

</style>