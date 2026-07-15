<script setup lang="ts">
import { Toaster } from "vue-sonner";

const route = useRoute();

const links = [
  { label: "Overview", to: "/admin", exact: true },
  { label: "Products", to: "/admin/products" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Users", to: "/admin/users" },
];

const isActive = (link: { to: string; exact?: boolean }) => {
  if (link.exact) return route.path === link.to;
  return route.path === link.to || route.path.startsWith(`${link.to}/`);
};
</script>

<template lang="pug">
  .min-h-screen.bg-ink.text-paper.flex.flex-col(class="lg:flex-row")
    ClientOnly
      Toaster(position="top-center" :duration="4000" theme="dark")
      AppCursor
    aside.w-full.border-b.border-white-10.px-4.py-4.flex.flex-col.gap-4.bg-ink-elevated.z-20(
      class="lg:w-60 lg:min-h-screen lg:border-b-0 lg:border-r lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:px-5 lg:py-6 lg:gap-6"
    )
      .flex.items-center.justify-between.gap-3
        NuxtLink.font-display.font-extrabold.uppercase.tracking-tighter.text-xl(
          to="/"
          class="lg:text-2xl"
        ) Nuxtify
        p.text-ash.text-xs.uppercase.tracking-widest Admin
      nav.flex.flex-row.gap-1.overflow-x-auto.pb-1(class="lg:flex-col lg:overflow-visible lg:pb-0 lg:gap-1")
        NuxtLink.shrink-0.px-3.py-2.text-xs.uppercase.tracking-widest.transition-colors(
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="lg:text-sm"
          :class="isActive(link) ? 'bg-accent text-ink' : 'text-ash hover:text-paper'"
        ) {{ link.label }}
      NuxtLink.hidden.text-xs.uppercase.tracking-widest.text-ash.transition-colors(
        to="/"
        class="lg:block lg:mt-auto hover:text-accent"
      ) ← Return to store
      NuxtLink.text-xs.uppercase.tracking-widest.text-ash.transition-colors(
        to="/"
        class="lg:hidden hover:text-accent"
      ) ← Store
    .flex-1.px-4.py-6.min-w-0(class="md:px-8 lg:px-10 lg:py-8")
      .max-w-6xl
        slot
</template>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
