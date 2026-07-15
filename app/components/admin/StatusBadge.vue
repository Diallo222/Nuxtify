<template lang="pug">
  span.inline-flex.items-center.px-2.py-1.text-xs.uppercase.tracking-widest(
    :class="toneClass"
  ) {{ label }}
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    tone?: "accent" | "ash" | "warn" | "danger";
  }>(),
  { tone: "ash" }
);

const toneClass = computed(() => {
  switch (props.tone) {
    case "accent":
      return "bg-accent text-ink";
    case "warn":
      return "border border-amber-400/50 text-amber-300";
    case "danger":
      return "border border-red-400/50 text-red-400";
    default:
      return "border border-white-20 text-ash";
  }
});
</script>

<style scoped>
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
