<template lang="pug">
  div
    h1.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl.mb-2 Orders
    p.text-ash.text-sm.mb-10 Demo orders — no live fulfillment.
    .border.border-white-10.divide-y.divide-white-10
      .flex.flex-wrap.items-center.justify-between.gap-4.px-4.py-5(
        v-for="order in orders"
        :key="order.id"
      )
        div
          p.font-display.font-bold {{ order.id }}
          p.text-ash.text-sm {{ order.customer }} · {{ order.items }} items
        .flex.items-center.gap-4
          span.text-xs.uppercase.tracking-widest.px-2.py-1(
            :class="order.status === 'Shipped' ? 'bg-accent text-ink' : 'border border-white-20 text-ash'"
          ) {{ order.status }}
          span.font-display.font-bold ${{ order.total.toFixed(2) }}
</template>

<script setup lang="ts">
definePageMeta({ layout: "admin" });

const orders = [
  { id: "ORD-1042", customer: "A. Mercer", items: 3, total: 248.5, status: "Processing" },
  { id: "ORD-1041", customer: "J. Cole", items: 1, total: 89.0, status: "Shipped" },
  { id: "ORD-1040", customer: "R. Vale", items: 2, total: 156.2, status: "Shipped" },
];
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
