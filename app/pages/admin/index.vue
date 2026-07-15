<template lang="pug">
  div
    AdminPageHeader(
      eyebrow="Control room"
      title="Overview"
      subtitle="Demo control room — mutations are local toasts."
    )
    CustomLoader(:loading="loading && !products.length")
    AdminStatStrip(:stats="stats")
    .grid.gap-4(class="md:grid-cols-3")
      NuxtLink.group.border.border-white-10.p-6.transition(
        v-for="card in cards"
        :key="card.to"
        :to="card.to"
        class="hover:border-accent"
        data-cursor="hover"
      )
        p.text-xs.uppercase.tracking-widest.text-accent {{ card.kicker }}
        h2.font-display.font-bold.uppercase.tracking-tight.text-xl.mt-3 {{ card.title }}
        p.text-ash.text-sm.mt-2 {{ card.body }}
        span.text-xs.uppercase.tracking-widest.text-paper.mt-6.inline-block.transition-colors(
          class="group-hover:text-accent"
        ) Open →
</template>

<script setup lang="ts">
import { useProductsStore } from "~/stores/products";

definePageMeta({ layout: "admin" });

const productStore = useProductsStore();
const products = computed(() => productStore.allProducts);
const loading = computed(() => productStore.loading);

const stats = computed(() => [
  {
    label: "Products",
    value: products.value.length || "—",
    hint: "Fake Store catalog",
  },
  {
    label: "Revenue",
    value: "$12.4k",
    hint: "Demo MTD",
  },
  {
    label: "Open orders",
    value: 3,
    hint: "Awaiting ship",
  },
  {
    label: "Users",
    value: 5,
    hint: "Demo accounts",
  },
]);

const cards = [
  {
    kicker: "01",
    title: "Products",
    body: "Search, filter, and stage demo catalog edits.",
    to: "/admin/products",
  },
  {
    kicker: "02",
    title: "Orders",
    body: "Track demo fulfillments and mark shipments.",
    to: "/admin/orders",
  },
  {
    kicker: "03",
    title: "Users",
    body: "Inspect roles and remove demo access.",
    to: "/admin/users",
  },
];

onMounted(() => {
  if (!productStore.products.length) productStore.fetchProducts();
});
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
