<template lang="pug">
  .flex.items-center.border.border-white-20
    button.px-4.py-3.text-paper.transition(
      type="button"
      aria-label="Decrease quantity"
      class="hover:text-accent"
      data-cursor="hover"
      @click="emit('decrease')"
    )
      Icon(name="mdi:minus" size="1.1em")
    span.min-w-10.text-center.font-display.font-bold {{ quantity }}
    button.px-4.py-3.text-paper.transition(
      type="button"
      aria-label="Increase quantity"
      class="hover:text-accent"
      data-cursor="hover"
      @click="emit('increase')"
    )
      Icon(name="mdi:plus" size="1.1em")
</template>

<script setup lang="ts">
defineProps<{ quantity: number }>();
const emit = defineEmits<{ decrease: []; increase: [] }>();
</script>

<style scoped>
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
