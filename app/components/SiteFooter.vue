<template lang="pug">
  footer.border-t.border-white-10.mt-24.pt-16.pb-10.px-5(class="md:px-10 lg:px-16")
    .grid.gap-12(class="lg:grid-cols-12")
      .space-y-4(class="lg:col-span-7")
        p.font-display.font-extrabold.uppercase.tracking-tighter.leading-none.text-paper(
          class="text-[14vw] md:text-[8vw] lg:text-[6.5vw]"
        ) NUXTIFY
        p.max-w-md.text-ash.text-sm.leading-relaxed(class="md:text-base")
          | Kinetic concept retail — fashion, jewelry, and electronics as one editorial stage.
      .flex.flex-col.gap-3.text-sm.uppercase.tracking-widest(class="lg:col-span-5 lg:items-end")
        NuxtLink.text-paper.transition-colors(to="/categories" class="hover:text-accent") Categories
        NuxtLink.text-paper.transition-colors(to="/about" class="hover:text-accent") About
        NuxtLink.text-paper.transition-colors(to="/blog" class="hover:text-accent") Journal
        NuxtLink.text-paper.transition-colors(to="/contact" class="hover:text-accent") Contact
        NuxtLink.text-paper.transition-colors(to="/admin" class="hover:text-accent") Admin
    .mt-16.flex.flex-col.gap-3.justify-between.text-ash.text-xs.uppercase.tracking-widest(class="md:flex-row")
      span © {{ year }} Nuxtify
      span Built as a kinetic concept store
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
