<template lang="pug">
  .group.space-y-3
    NuxtLink.block.overflow-hidden.bg-ink-muted(class="aspect-[16/10]" :to="`/blog/${post.slug}`" data-cursor="hover")
      .w-full.h-full.bg-gradient-to-br.from-ink-muted.to-ink.flex.items-end.p-6.transition.duration-500(
        class="group-hover:from-ink-elevated"
      )
        span.text-accent.text-xs.uppercase.tracking-widest Journal
    .space-y-2
      p.uppercase.tracking-widest.text-ash(class="text-[10px]") {{ post.date }}
      NuxtLink.font-display.font-bold.text-xl.leading-tight.transition-colors(
        :to="`/blog/${post.slug}`"
        class="md:text-2xl hover:text-accent"
        data-cursor="hover"
      ) {{ post.title }}
      p.text-ash.text-sm.line-clamp-2 {{ post.excerpt }}
</template>

<script setup lang="ts">
defineProps<{
  post: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
  };
}>();
</script>
