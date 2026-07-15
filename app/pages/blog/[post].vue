<template lang="pug">
  article.px-5.py-16.max-w-3xl.mx-auto(class="md:px-10" v-if="article")
    NuxtLink.text-xs.uppercase.tracking-widest.text-ash.transition-colors(
      to="/blog"
      class="hover:text-accent"
    ) ← Journal
    .flex.flex-wrap.items-center.gap-3.mt-8
      p.text-accent.text-xs.uppercase(class="tracking-[0.3em]") {{ article.date }}
      span.text-ash(class="text-[10px]") ·
      span.text-ash.uppercase.tracking-widest(
        class="text-[10px]"
        v-for="tag in article.tags"
        :key="tag"
      ) {{ tag }}
    h1.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl.mt-4.leading-none(
      class="md:text-6xl"
    ) {{ article.title }}
    p.text-paper.mt-6.text-lg.leading-relaxed.max-w-2xl {{ article.excerpt }}
    .mt-10.overflow-hidden.bg-ink-muted(class="aspect-[16/10]")
      NuxtImg.w-full.h-full.object-cover(
        :src="article.image"
        :alt="article.title"
      )
    .mt-12.space-y-6.text-ash.leading-relaxed.text-base(class="md:text-lg")
      p(v-for="(p, i) in paragraphs" :key="i") {{ p }}
    .mt-16.pt-10.border-t.border-white-10
      p.text-xs.uppercase.tracking-widest.text-ash More from the journal
      .mt-6.flex.flex-col.gap-4
        NuxtLink.font-display.font-bold.transition-colors(
          v-for="related in relatedPosts"
          :key="related.slug"
          :to="`/blog/${related.slug}`"
          class="hover:text-accent"
        ) {{ related.title }} →
      Magnetic.mt-10.inline-block(tag="div")
        NuxtLink.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.px-8.py-4(
          to="/blog"
          data-cursor="hover"
        ) All essays
  .px-5.py-32.text-center(v-else)
    p.font-display.font-bold.text-3xl Piece not found
    NuxtLink.mt-6.inline-block.text-accent(to="/blog") ← Back to journal
</template>

<script setup lang="ts">
import { getJournalPost, getJournalPosts } from "~/data/journal";

const route = useRoute();
const slug = computed(() => String(route.params.post));

const article = computed(() => getJournalPost(slug.value));

const paragraphs = computed(() => {
  if (!article.value) return [];
  return article.value.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
});

const relatedPosts = computed(() =>
  getJournalPosts()
    .filter((p) => p.slug !== slug.value)
    .slice(0, 3)
);

useSeoMeta({
  title: () =>
    article.value
      ? `${article.value.title} — Nuxtify Journal`
      : "Piece not found — Nuxtify",
  description: () => article.value?.excerpt ?? "Journal essay not found.",
});
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
