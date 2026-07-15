<template lang="pug">
  component(
    :is="tag"
    ref="el"
    data-magnetic
    @mousemove="onMove"
    @mouseleave="onLeave"
  )
    slot
</template>

<script setup lang="ts">
import gsap from "gsap";

const props = withDefaults(
  defineProps<{
    tag?: string;
    strength?: number;
  }>(),
  {
    tag: "div",
    strength: 0.35,
  }
);

const el = ref<HTMLElement | null>(null);
const reduced = useReducedMotion();

const onMove = (e: MouseEvent) => {
  if (!el.value || reduced.value) return;
  const rect = el.value.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(el.value, {
    x: x * props.strength,
    y: y * props.strength,
    duration: 0.35,
    ease: "power3.out",
  });
};

const onLeave = () => {
  if (!el.value) return;
  gsap.to(el.value, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.4)" });
};
</script>
