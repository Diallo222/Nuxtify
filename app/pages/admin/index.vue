<template lang="pug">
  div
    h1.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl.mb-2(
      class="md:text-5xl"
    ) Admin
    p.text-ash.mb-12.text-sm Control room for the kinetic store.
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
definePageMeta({ layout: "admin" });

const cards = [
  {
    kicker: "01",
    title: "Products",
    body: "View, add, edit, or delete catalog pieces.",
    to: "/admin/products",
  },
  {
    kicker: "02",
    title: "Orders",
    body: "Review and process customer orders.",
    to: "/admin/orders",
  },
  {
    kicker: "03",
    title: "Users",
    body: "Inspect accounts and remove access.",
    to: "/admin/users",
  },
];
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
