<template lang="pug">
    .container.flex.flex-col(v-if="!loading && categories.length > 0")
        h2.text-xl.text-left.font-bold.text-black.uppercase(class="md:text-5xl") categories
        .flex.flex-wrap.justify-center.gap-2.mt-8(v-if="!loading && categories.length > 0")
            CategoryCard(v-for="category in categories" :key="category" :category="category")
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
