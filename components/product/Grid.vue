<template lang="pug">
  .grid.grid-cols-2.mt-4.gap-4(class="md:grid-cols-3 xl:grid-cols-4" v-if="!loading && products.length > 0")
    ProductCard(v-for="product in products" :key="product.id" :product="product")
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
