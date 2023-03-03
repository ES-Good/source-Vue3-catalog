<template>
    <div class="card-product__footer">
        
        <button v-if="allowed || available" class="card-product__btn">
        В корзину
        </button>

        <button v-else class="card-product__btn" disabled>
            Нет в наличии
        </button>
    </div>
</template>

<script>
export default {
    name: 'CardFooter',
    props: {
        allowed: Boolean,
        available: Boolean
    }
}
</script>

<style>

</style>