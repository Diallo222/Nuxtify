<template lang="pug">
  .px-5.py-16(class="md:px-10 lg:px-16")
    h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.mb-10(
      class="md:text-7xl"
    ) Favorites
    .py-24.text-center(v-if="!products.length")
      p.font-display.font-bold.uppercase.tracking-tighter.text-3xl Empty wishlist
      p.text-ash.mt-3 Heart pieces to build your cast.
      Magnetic.mt-8.inline-block(tag="div")
        NuxtLink.bg-accent.text-ink.font-display.font-bold.uppercase.px-8.py-4(
          to="/categories"
          data-cursor="hover"
        ) Browse shop
    ProductGrid(
      v-else
      title=""
      :products="products"
      :loading="false"
    )
</template>

<script setup lang="ts">
import { useFavoritesStore } from "~/stores/favorites";

const favoritesStore = useFavoritesStore();

onMounted(() => {
  favoritesStore.loadFavorites();
});

const products = computed(() => favoritesStore.favorites);
</script>
