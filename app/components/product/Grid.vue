<template lang="pug">
  section.px-5.py-16(class="md:px-10 lg:px-16" ref="section" v-if="!loading && products.length")
    .flex.items-end.justify-between.mb-10.gap-4
      h2.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl(
        class="md:text-6xl"
        data-reveal
      ) {{ title }}
      NuxtLink.text-xs.uppercase.tracking-widest.text-ash.transition-colors(
        v-if="link"
        :to="link"
        class="hover:text-accent"
        data-cursor="hover"
      ) View all
    .grid.grid-cols-2.gap-4(class="md:grid-cols-3 lg:grid-cols-4 md:gap-6" ref="grid")
      ProductCard(
        v-for="(product, i) in products"
        :key="product.id"
        :product="product"
        :featured="mosaic && i === 0"
      )
</template>

<script setup lang="ts">
import type Product from "~/stores/types";

defineProps<{
  title?: string;
  products: Product[];
  loading: boolean;
  mosaic?: boolean;
  link?: string;
}>();

const section = ref<HTMLElement | null>(null);
const { revealChildren } = useReveal();

onMounted(() => {
  nextTick(() => {
    revealChildren(section.value, "[data-reveal]", {
      variant: "fade",
      stagger: 0.08,
      y: 40,
    });
  });
});
</script>
