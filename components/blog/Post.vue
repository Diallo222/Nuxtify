<template lang="pug">
    .bg-white.shadow-md.p-6.flex.flex-col
      h2.text-xl.font-semibold.text-gray-800 {{ post.title }}
      p.text-gray-600.mt-2.truncate {{ post.summary }}
      nuxt-link.text-black.font-semibold.mt-4.self-start(:to="post.link") Read More →
  </template>

<script setup lang="ts">
const props = defineProps({
  post: {
    type: Object as () => { title: string; summary: string; link: string },
    required: true,
  },
});
</script>
