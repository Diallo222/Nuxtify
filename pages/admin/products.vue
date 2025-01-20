<template lang="pug">
    .container.mx-auto.py-12.px-4(class="md:px-8 lg:px-16")
      h1.text-2xl.font-bold.text-gray-800.mb-8(class="md:text-4xl") Manage Products
      button.bg-indigo-600.text-white.font-semibold.py-2.px-4.rounded-lg.mb-6.transition Add Product
      .grid.grid-cols-1.gap-8
        .flex.justify-between.items-center.p-4.bg-white.shadow-md.rounded-lg(v-for="product in products" :key="product.id")
          .flex-1
            h2.text-lg.font-semibold.text-gray-800 {{ product.title }}
            p.text-gray-600.text-sm ${{ product.price }}
          .flex.items-center
            button.bg-gray-200.text-gray-600.px-3.py-1.rounded-lg(class="hover:bg-gray-300") Edit
            button.bg-red-600.text-white.px-3.py-1.rounded-lg.ml-2(class="hover:bg-red-700") Delete
  </template>

<script setup lang="ts">
import { useProductsStore } from "~/store/products";
const productStore = useProductsStore();

definePageMeta({
  layout: "admin",
});

const products = computed(() => productStore.allProducts);
</script>
