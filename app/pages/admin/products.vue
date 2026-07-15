<template lang="pug">
  div
    .flex.flex-wrap.items-center.justify-between.gap-4.mb-10
      div
        h1.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl Products
        p.text-ash.text-sm.mt-1 {{ products.length }} items from Fake Store
      button.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.px-5.py-3.text-sm(
        type="button"
        data-cursor="hover"
        @click="toast.message('Demo only — add product UI')"
      ) Add product
    CustomLoader(:loading="loading")
    .border.border-white-10.divide-y.divide-white-10(v-if="!loading")
      .flex.flex-wrap.items-center.justify-between.gap-4.px-4.py-4(
        v-for="product in products"
        :key="product.id"
      )
        .flex.items-center.gap-4.min-w-0
          NuxtImg.w-12.h-12.object-contain.bg-ink-muted.p-1(
            :src="product.image"
            :alt="product.title"
          )
          div.min-w-0
            p.font-display.font-bold.truncate {{ product.title }}
            p.text-ash.text-xs.uppercase.tracking-widest {{ product.category }} · ${{ product.price }}
        .flex.gap-2
          button.border.border-white-20.px-3.py-2.text-xs.uppercase.tracking-widest.transition(
            type="button"
            class="hover:border-accent hover:text-accent"
            data-cursor="hover"
            @click="toast.message('Demo edit')"
          ) Edit
          button.border.border-white-20.px-3.py-2.text-xs.uppercase.tracking-widest.text-red-400.transition(
            type="button"
            class="hover:border-red-400"
            data-cursor="hover"
            @click="toast.message('Demo delete')"
          ) Delete
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { useProductsStore } from "~/stores/products";

definePageMeta({ layout: "admin" });

const productStore = useProductsStore();
const products = computed(() => productStore.allProducts);
const loading = computed(() => productStore.loading);

onMounted(() => {
  if (!productStore.products.length) productStore.fetchProducts();
});
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
.divide-white-10 > :not([hidden]) ~ :not([hidden]) {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
