<template lang="pug">
    .container.flex.flex-col.py-8(v-if="!loading && categories.length > 0")
        h2.text-2xl.text-left.font-bold.text-black.uppercase.relative.pb-2(
          class="md:text-5xl after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-24 "
        ) categories
        .grid.gap-4.mt-8(
          class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          v-if="!loading && categories.length > 0"
        )
            CategoryCard(
              v-for="category in categories" 
              :key="category" 
              :category="category"
              class="transform transition-all duration-300 hover:z-10"
            )
</template>

<script setup lang="ts">
import { useProductsStore } from "~/store/products";
import { computed, onMounted } from "vue";
const productStore = useProductsStore();

onMounted(() => {
  productStore.fetchCategories();
});

const categories = computed(() => productStore.categories);
const loading = computed(() => productStore.catLoading);
</script>
