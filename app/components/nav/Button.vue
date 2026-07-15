<template lang="pug">
  button.inline-flex.items-center.justify-center.gap-2.font-display.font-bold.uppercase.tracking-wide.transition(
    :class="classes"
    :type="type"
    data-cursor="hover"
  )
    slot
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "primary" | "ghost" | "outline";
    type?: "button" | "submit" | "reset";
    size?: "sm" | "md" | "lg";
  }>(),
  {
    variant: "primary",
    type: "button",
    size: "md",
  }
);

const classes = computed(() => {
  const size =
    props.size === "sm"
      ? "px-4 py-2 text-xs"
      : props.size === "lg"
        ? "px-8 py-4 text-sm md:text-base"
        : "px-6 py-3 text-sm";

  const variant =
    props.variant === "ghost"
      ? "bg-transparent text-paper hover:text-accent"
      : props.variant === "outline"
        ? "border border-white/20 text-paper hover:border-accent hover:text-accent"
        : "bg-accent text-ink hover:brightness-110";

  return `${size} ${variant}`;
});
</script>
