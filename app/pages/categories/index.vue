<template lang="pug">
  .px-5.py-16(class="md:px-10 lg:px-16")
    .mb-12
      p.text-accent.text-xs.uppercase(class="tracking-[0.3em]") Explore
      h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.mt-3(
        class="md:text-7xl"
      ) Categories
      p.text-ash.mt-4.max-w-md Four collections. One kinetic floor.
    CustomLoader(:loading="loading")
    .grid.grid-cols-1.gap-4(class="md:grid-cols-2 md:gap-6" v-if="!loading")
      CategoryCard(v-for="cat in categories" :key="cat" :category="cat")
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
