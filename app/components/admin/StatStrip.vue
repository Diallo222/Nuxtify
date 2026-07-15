<template lang="pug">
  .grid.gap-3.mb-10(class="sm:grid-cols-2 lg:grid-cols-4")
    .border.border-white-10.bg-ink-elevated.px-4.py-5(
      v-for="stat in stats"
      :key="stat.label"
    )
      p.text-ash.text-xs.uppercase.tracking-widest {{ stat.label }}
      p.font-display.font-extrabold.tracking-tight.text-3xl.mt-2 {{ stat.value }}
      p.text-ash.text-xs.mt-1(v-if="stat.hint") {{ stat.hint }}
</template>

<script setup lang="ts">
defineProps<{
  stats: Array<{
    label: string;
    value: string | number;
    hint?: string;
  }>;
}>();
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
