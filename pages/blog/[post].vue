<template lang="pug">
    .container.mx-auto.py-12.px-4(class="md:px-8 lg:px-16")
      .text-center.mb-8
        h1.text-3xl.font-bold.text-gray-800(class="md:text-5xl") {{ article.title }}
        p.text-lg.text-gray-600.mt-4(class="md:text-xl") {{ article.date }}
  
      .prose.max-w-none.mx-auto.mt-8.text-gray-700
        p {{ article.content }}
  </template>

<script setup lang="ts">
const article = {
  slug: "top-10-products-2025",
  title: "Lorem ipsum for 2025",
  date: "January 10, 2025",
  content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
        Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. 
        Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Aliquam erat volutpat. Ut at ullamcorper libero. Quisque fermentum, eros non lobortis tincidunt, 
        turpis justo aliquam arcu, vel efficitur nunc nisi nec dolor. In tristique felis a purus malesuada, 
        quis convallis velit elementum.
      `,
};
</script>
