<template lang="pug">
    .container
        .grid.grid-cols-4.gap-4(v-if="!loading && products.length > 0")
            ProductCard(v-for="product in products" :key="product.id" :product="product")
        .flex.justify-center(v-if="loading")
            p Loading...
</template>

<script setup lang="ts">
import { useProductsStore } from "@/store/products";

onMounted(() => {
  productStore.fetchProducts();
});
const productStore = useProductsStore();
const products = computed(() => productStore.allProducts);
const loading = computed(() => productStore.loading);
</script>
