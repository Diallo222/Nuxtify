<template lang="pug">
    .container.mx-auto.py-12.px-4(class="md:px-8 lg:px-16")
      .text-center.mb-8
        h1.text-3xl.font-bold.text-gray-800.uppercase(class="md:text-5xl") Nuxtify Blog
        p.text-lg.text-gray-600.mt-4(class="md:text-xl")
          | Stay updated with the latest trends, tips, and insights from the world of e-commerce.
  
      .grid.grid-cols-1.gap-8(class="md:grid-cols-2 lg:grid-cols-3")
        BlogPost(v-for="post in posts" :key="post.id" :post="post")
  </template>

<script setup lang="ts">
const posts = [
  {
    id: 1,
    title: "Top 10 Products for 2025",
    summary:
      "Discover the must-have products of the year that are trending across the globe.",
    link: "/blog/top-10-products-2025",
  },
  {
    id: 2,
    title: "E-Commerce Tips for Beginners",
    summary:
      "Learn how to get started with your e-commerce journey with these simple tips.",
    link: "/blog/ecommerce-tips-for-beginners",
  },
  {
    id: 3,
    title: "Why Fast Delivery Matters",
    summary:
      "Explore how fast delivery enhances customer satisfaction and drives sales.",
    link: "/blog/why-fast-delivery-matters",
  },
];
</script>
