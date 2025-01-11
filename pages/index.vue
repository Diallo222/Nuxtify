<template lang="pug">
    .container.flex.flex-col.justify-center.items-center
        ProductCaroussel(:products="products.slice(0, 5)" :loading="loading")
        ProductGrid(:products="products" :loading="loading")
</template>

<script setup lang="ts">
import { useProductsStore } from "@/store/products";
import { useFavoritesStore } from "~/store/favorites";

const productStore = useProductsStore();
const favoritesStore = useFavoritesStore();

onMounted(() => {
  productStore.fetchProducts();
  favoritesStore.loadFavorites();
});
const products = computed(() => productStore.allProducts);
const loading = computed(() => productStore.loading);
</script>
