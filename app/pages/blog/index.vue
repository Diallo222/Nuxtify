<template lang="pug">
  .px-5.py-16(class="md:px-10 lg:px-16")
    .mb-14
      p.text-accent.text-xs.uppercase(class="tracking-[0.3em]") Journal
      h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.mt-3(
        class="md:text-7xl"
      ) From the stage
      p.text-ash.mt-4.max-w-md Trends, tips, and notes from the Nuxtify floor.
    .grid.grid-cols-1.gap-10(class="md:grid-cols-2 lg:grid-cols-3")
      BlogPost(v-for="post in posts" :key="post.slug" :post="post")
</template>

<script setup lang="ts">
const posts = [
  {
    slug: "top-10-products-2025",
    title: "Top 10 products for the season",
    date: "Mar 12, 2026",
    excerpt:
      "Discover the must-have pieces staging the year — from signal gadgets to quiet luxury layers.",
  },
  {
    slug: "ecommerce-tips-for-beginners",
    title: "E-commerce tips for beginners",
    date: "Feb 28, 2026",
    excerpt:
      "How to start a retail story with clarity, motion, and a single strong brand signal.",
  },
  {
    slug: "why-fast-delivery-matters",
    title: "Why fast delivery matters",
    date: "Jan 18, 2026",
    excerpt:
      "Speed is part of the spectacle — explore how fulfillment shapes trust and return visits.",
  },
];
</script>
