<template lang="pug">
    .container.flex.flex-col.justify-center.items-center
        //- Banner(:products="bannerProducts" loading="bannerLoading")
        ProductGrid(:products="products" :loading="loading")
</template>

<script setup lang="ts">
import { useProductsStore } from "@/store/products";

onMounted(() => {
  //   productStore.fetchBannerProducts();
  productStore.fetchProducts();
});
const productStore = useProductsStore();
const bannerProducts = computed(() => productStore.bannerProducts);
const bannerLoading = computed(() => productStore.bannerLoading);
const products = computed(() => productStore.allProducts);
const loading = computed(() => productStore.loading);
</script>
