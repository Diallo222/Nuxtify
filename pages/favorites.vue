<template lang="pug">
    .container.flex.flex-col.justify-center.items-center
        h2.text-xl.text-left.font-bold.text-black.uppercase.my-8(class="md:text-5xl" v-if="products.length === 0") You have no favorites for the moment
        ProductGrid(:title="'Your Favorites'" :products="products" :loading="false")
</template>

<script setup lang="ts">
import { useFavoritesStore } from "~/store/favorites";

const favoritesStore = useFavoritesStore();

onMounted(() => {
  favoritesStore.loadFavorites();
});
const products = computed(() => favoritesStore.favorites);
</script>
