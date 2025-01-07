<template lang="pug">
    .flex.flex-col
        label.text-black(for="label") {{ label }}
        input.form-control#name(type="text" :placeholder="placeholder" v-model="value" :disabled="isDisabled")
        p.text-danger(v-if="error") {{ error }}
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
