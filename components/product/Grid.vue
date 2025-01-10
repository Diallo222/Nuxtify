<template lang="pug">
  .grid.grid-cols-2.mt-4.gap-4(class="sm:grid-cols-3 lg:grid-cols-4" v-if="!loading && products.length > 0")
    ProductCard(v-for="product in products" :key="product.id" :product="product")
  .flex.justify-center(v-if="loading")
      p.animate-pulse Loading...
</template>
<script setup lang="ts">
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>
