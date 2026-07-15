<template lang="pug">
  CategoryStrip(:categories="categories")
</template>

<script setup lang="ts">
import { useProductsStore } from "~/stores/products";

const store = useProductsStore();
const categories = computed(() => store.allCategories);

onMounted(() => {
  if (!store.categories.length) store.fetchCategories();
});
</script>
