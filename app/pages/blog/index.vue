<template lang="pug">
  .px-5.py-16(class="md:px-10 lg:px-16")
    .mb-14
      p.text-accent.text-xs.uppercase(class="tracking-[0.3em]") Journal
      h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.mt-3(
        class="md:text-7xl"
      ) From the stage
      p.text-ash.mt-4.max-w-md Notes on kinetic retail, Nuxt commerce, and the craft behind Nuxtify.
    .grid.grid-cols-1.gap-10(class="md:grid-cols-2 lg:grid-cols-3")
      BlogPost(v-for="post in posts" :key="post.slug" :post="post")
</template>

<script setup lang="ts">
import { getJournalPosts } from "~/data/journal";

const posts = getJournalPosts();

useSeoMeta({
  title: "Journal — Nuxtify",
  description:
    "Essays on kinetic storefronts, headless Nuxt commerce, design tokens, and performance.",
});
</script>
