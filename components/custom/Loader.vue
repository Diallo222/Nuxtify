<template lang="pug">
    .flex.flex-col.justify-center.items-center.animate-pulse(v-if="loading")
        Icon(name="mdi:nuxt" size="6em")
        p.text-xl.uppercase Loading...
</template>

<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>
