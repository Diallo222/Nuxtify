<template lang="pug">
    .container.flex.flex-col.justify-center.items-center
        h1 Categories
        .flex.flex-wrap.justify-center.gap-4
            .space-y-1.text-center(class="hover:cursor-pointer hover:scale-110 transition" v-for="category in categories" :key="category" @click="handleclick(category)")
                NuxtImg.object-contain.w-48.h-48(:src="`/images/${category.toLowerCase()}.png`" :alt="category")
                p.text-black {{ category }}
        .flex.justify-center(v-if="loading")
            p.animate-pulse Loading...
    </template>

<script setup lang="ts">
import { useProductsStore } from "~/store/products";
import { computed, onMounted } from "vue";
const router = useRouter();

const handleclick = (category: string) => {
  productStore.fetchCategoryProducts(category);
  router.push(`/categories/${category}`);
};

const productStore = useProductsStore();

onMounted(() => {
  productStore.fetchCategories();
});

const categories = computed(() => productStore.categories);
const loading = computed(() => productStore.catLoading);
</script>
