<template lang="pug">
   .container.flex.flex-col.justify-center.items-center
        ProductGrid(:products="products" :loading="loading")
</template>

<script setup lang="ts">
import { useProductsStore } from "~/store/products";
const productStore = useProductsStore();

const products = computed(() => productStore.categoryProducts);
const loading = computed(() => productStore.catProductsLoading);
</script>
