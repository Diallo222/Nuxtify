<template lang="pug">
  NuxtLink.group.relative.block.overflow-hidden.bg-ink-muted(class="aspect-[4/3]" 
    :to="`/categories/${encodeURIComponent(category)}`"
    data-cursor="hover"
  )
    NuxtImg.absolute.inset-0.w-full.h-full.object-cover.opacity-40.transition.duration-700(
      class="group-hover:scale-105 group-hover:opacity-60"
      :src="image"
      :alt="category"
    )
    .absolute.inset-0.flex.flex-col.justify-end.p-6.bg-gradient-to-t.from-ink.via-transparent.to-transparent
      h3.font-display.font-extrabold.uppercase.tracking-tighter.text-2xl(class="md:text-3xl") {{ category }}
      span.text-xs.uppercase.tracking-widest.text-accent.mt-2 Shop collection →
</template>

<script setup lang="ts">
const props = defineProps<{ category: string }>();

const image = computed(() => {
  const map: Record<string, string> = {
    electronics: "/images/electronics.png",
    jewelery: "/images/jewelery.png",
    "men's clothing": "/images/men's clothing.png",
    "women's clothing": "/images/women's clothing.png",
  };
  return map[props.category] || "/images/electronics.png";
});
</script>
