<template lang="pug">
  .border.border-white-10
    .px-4.py-3.border-b.border-white-10.text-ash.text-xs.uppercase.tracking-widest.hidden(
      class="md:block"
      v-if="columns?.length"
    )
      .flex.items-center.gap-4
        span.flex-1(v-for="col in columns" :key="col.key" :class="col.class") {{ col.label }}
    .divide-y.divide-white-10(v-if="!empty")
      slot
    .px-4.py-16.text-center(v-else)
      p.font-display.font-bold.uppercase.tracking-tight.text-xl {{ emptyTitle }}
      p.text-ash.text-sm.mt-2 {{ emptySubtitle }}
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    columns?: Array<{ key: string; label: string; class?: string }>;
    empty?: boolean;
    emptyTitle?: string;
    emptySubtitle?: string;
  }>(),
  {
    empty: false,
    emptyTitle: "Nothing here",
    emptySubtitle: "No rows match this view.",
  }
);
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
.divide-white-10 > :not([hidden]) ~ :not([hidden]) {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
