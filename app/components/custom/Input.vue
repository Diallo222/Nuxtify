<template lang="pug">
  label.block.space-y-2
    span.text-xs.uppercase.tracking-widest.text-ash(v-if="label") {{ label }}
    input.w-full.bg-transparent.border-b.px-0.py-3.text-paper.placeholder-ash.transition(
      :class="error ? 'border-red-400 focus:border-red-400' : 'border-white-20 focus:border-accent'"
      class="focus:outline-none"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :name="name"
      :id="id"
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      :maxlength="maxlength"
      @input="onInput"
    )
    p.text-red-400.text-xs(v-if="error") {{ error }}
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
    error?: string;
    autocomplete?: string;
    inputmode?: string;
    maxlength?: number | string;
  }>(),
  {
    type: "text",
    modelValue: "",
  }
);

const emit = defineEmits<{ "update:modelValue": [string] }>();

const onInput = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<style scoped>
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
