<template lang="pug">
  .flex.flex-col.items-center.justify-center.py-24.gap-4(v-if="loading")
    .w-10.h-10.border.border-ash.border-t-accent.rounded-full.animate-spin
    p.text-ash.text-xs.uppercase.tracking-widest Loading
</template>

<script setup lang="ts">
defineProps<{ loading: boolean }>();
</script>
