<template lang="pug">
  .px-5.py-10(class="md:px-10 lg:px-16")
    CustomLoader(:loading="loading")
    ProductDetails(v-if="product && !loading" :product="product")
    p.text-ash(v-else-if="!loading") Product not found.
</template>

<script setup lang="ts">
import { useProductsStore } from "~/stores/products";
import { useFavoritesStore } from "~/stores/favorites";

const route = useRoute();
const store = useProductsStore();
const favorites = useFavoritesStore();

const product = computed(() => store.selectedProduct);
const loading = computed(() => store.loading);

onMounted(async () => {
  favorites.loadFavorites();
  const id = route.params.product;
  if (!store.selectedProduct || String(store.selectedProduct.id) !== String(id)) {
    await store.fetchProduct(id as string);
  }
});
</script>
