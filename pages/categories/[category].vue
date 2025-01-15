<template lang="pug">
   .container.flex.flex-col.justify-center
        h2.text-xl.text-left.font-bold.text-black.uppercase(class="md:text-5xl") {{ category }}
        ProductGrid(:products="products" :loading="loading")
</template>

<script setup lang="ts">
import { useProductsStore } from "~/store/products";
const productStore = useProductsStore();
const route = useRoute();
const category = computed(() => route.params.category);
const products = computed(() => productStore.categoryProducts);
const loading = computed(() => productStore.catProductsLoading);
</script>
