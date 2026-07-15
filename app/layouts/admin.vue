<script setup lang="ts">
import { Toaster } from "vue-sonner";

const route = useRoute();

const links = [
  { label: "Overview", to: "/admin" },
  { label: "Products", to: "/admin/products" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Users", to: "/admin/users" },
];
</script>

<template lang="pug">
  .min-h-screen.bg-ink.text-paper.flex(class="lg:flex-row")
    ClientOnly
      Toaster(position="top-center" :duration="4000" theme="dark")
      AppCursor
    aside.w-full.border-b.border-white-10.px-5.py-6.flex.flex-col.gap-6.bg-ink-elevated(
      class="lg:w-64 lg:min-h-screen lg:border-b-0 lg:border-r"
    )
      NuxtLink.font-display.font-extrabold.uppercase.tracking-tighter.text-2xl(to="/") Nuxtify
      p.text-ash.text-xs.uppercase.tracking-widest Admin
      nav.flex.flex-row.flex-wrap.gap-2(class="lg:flex-col")
        NuxtLink.px-3.py-2.text-sm.uppercase.tracking-widest.transition-colors(
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="route.path === link.to ? 'bg-accent text-ink' : 'text-ash hover:text-paper'"
        ) {{ link.label }}
      NuxtLink.mt-auto.text-xs.uppercase.tracking-widest.text-ash.transition-colors(
        to="/"
        class="hover:text-accent"
      ) ← Return to store
    .flex-1.px-5.py-8(class="md:px-10 lg:px-12")
      slot
</template>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
