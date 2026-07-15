<template lang="pug">
  CategoryStrip(v-if="categories.length" :categories="categories")
  .px-5.py-16.text-ash.text-sm(v-else-if="loading" class="md:px-10 lg:px-16") Loading categories…
</template>

<script setup lang="ts">
import { useProductsStore } from "~/stores/products";

const store = useProductsStore();
const categories = computed(() => store.allCategories);
const loading = computed(() => store.catLoading);

onMounted(() => {
  if (!store.categories.length) store.fetchCategories();
});
</script>
