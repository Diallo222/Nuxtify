<template lang="pug">
  .container.flex.flex-col.w-full(v-if="!loading && products.length > 0")
    h2.text-xl.text-left.font-bold.text-black.uppercase.my-8(class="md:text-5xl") {{ title }}
    .grid.grid-cols-2.gap-4(class="md:grid-cols-3 xl:grid-cols-4")
      ProductCard(v-for="product in products" :key="product.id" :product="product")
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
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
