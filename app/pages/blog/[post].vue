<template lang="pug">
  article.px-5.py-16.max-w-3xl.mx-auto(class="md:px-10")
    NuxtLink.text-xs.uppercase.tracking-widest.text-ash.transition-colors(
      to="/blog"
      class="hover:text-accent"
    ) ← Journal
    p.text-accent.text-xs.uppercase.mt-8(class="tracking-[0.3em]") {{ article.date }}
    h1.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl.mt-4.leading-none(
      class="md:text-6xl"
    ) {{ article.title }}
    .mt-12.space-y-6.text-ash.leading-relaxed.text-base(class="md:text-lg")
      p(v-for="(p, i) in paragraphs" :key="i") {{ p }}
</template>

<script setup lang="ts">
const article = {
  title: "Retail as theater",
  date: "January 10, 2026",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.

Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Aliquam erat volutpat. Ut at ullamcorper libero.

Quisque fermentum, eros non lobortis tincidunt, turpis justo aliquam arcu, vel efficitur nunc nisi nec dolor. In tristique felis a purus malesuada, quis convallis velit elementum.`,
};

const paragraphs = computed(() =>
  article.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
);
</script>
