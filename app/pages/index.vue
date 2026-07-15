<template lang="pug">
    .container.flex.flex-col.justify-center.items-center
        ProductCaroussel(:products="products.slice(0, 5)" :loading="loading")
        CategoryList
        ProductGrid(:title="'Latest Products'" :products="products.slice(0,8)" :loading="loading")
        CustomLoader(:loading="loading")
</template>

<script setup lang="ts">
import { useProductsStore } from "@/stores/products";
import { useFavoritesStore } from "~/stores/favorites";
import { useCartStore } from "~/stores/cart";

const productStore = useProductsStore();
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

onMounted(() => {
  productStore.fetchProducts();
  favoritesStore.loadFavorites();
});
const products = computed(() => productStore.allProducts);
const loading = computed(() => productStore.loading);
</script>
