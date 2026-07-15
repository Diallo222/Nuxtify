<template lang="pug">
  label.block.space-y-2
    span.text-xs.uppercase.tracking-widest.text-ash(v-if="label") {{ label }}
    input.w-full.bg-transparent.border-b.border-white-20.px-0.py-3.text-paper.placeholder-ash.transition(
      class="focus:outline-none focus:border-accent"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :name="name"
      :id="id"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    )
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    name?: string;
    id?: string;
  }>(),
  {
    type: "text",
    modelValue: "",
  }
);

defineEmits<{ "update:modelValue": [string] }>();
</script>

<style scoped>
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
