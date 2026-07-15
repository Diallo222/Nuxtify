<template lang="pug">
  .group.space-y-3
    NuxtLink.block.relative.overflow-hidden.bg-ink-muted(class="aspect-[16/10]" :to="`/blog/${post.slug}`" data-cursor="hover")
      NuxtImg.absolute.inset-0.w-full.h-full.object-cover.transition.duration-700(
        class="group-hover:scale-105"
        :src="post.image"
        :alt="post.title"
        loading="lazy"
      )
      .absolute.inset-0.bg-gradient-to-t.from-ink.via-ink-40.to-transparent
      .absolute.inset-x-0.bottom-0.p-6.flex.flex-wrap.gap-2
        span.text-accent.text-xs.uppercase.tracking-widest(
          v-for="tag in post.tags?.slice(0, 2)"
          :key="tag"
        ) {{ tag }}
        span.text-ash.uppercase.tracking-widest(class="text-[10px]" v-if="!post.tags?.length") Journal
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
    image: string;
    tags?: string[];
  };
}>();
</script>

<style scoped>
.via-ink-40 {
  --tw-gradient-via: color-mix(in srgb, var(--color-ink) 40%, transparent);
}
.from-ink {
  --tw-gradient-from: var(--color-ink);
}
</style>
