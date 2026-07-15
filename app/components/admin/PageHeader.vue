<template lang="pug">
  .flex.flex-wrap.items-start.justify-between.gap-4.mb-10
    div
      p.text-accent.text-xs.uppercase.tracking-widest(v-if="eyebrow") {{ eyebrow }}
      h1.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl.mt-1(
        class="md:text-5xl"
      ) {{ title }}
      p.text-ash.text-sm.mt-2(v-if="subtitle") {{ subtitle }}
    .shrink-0
      slot(name="actions")
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
}>();
</script>
