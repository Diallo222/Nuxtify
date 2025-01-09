<template lang="pug">
    .container.flex.flex-col.justify-center.items-center
        //- Banner(:products="bannerProducts" loading="bannerLoading")
        .grid.grid-cols-2.mt-4.gap-4(class="sm:grid-cols-3 lg:grid-cols-5" v-if="!loading && products.length > 0")
            ProductCard(v-for="product in products" :key="product.id" :product="product")
        .flex.justify-center(v-if="loading")
            p.animate-pulse Loading...
</template>

<script setup lang="ts">
import { useProductsStore } from "@/store/products";

onMounted(() => {
  productStore.fetchBannerProducts();
  productStore.fetchProducts();
});
const productStore = useProductsStore();
const bannerProducts = computed(() => productStore.bannerProducts);
const bannerLoading = computed(() => productStore.bannerLoading);
const products = computed(() => productStore.allProducts);
const loading = computed(() => productStore.loading);
</script>
