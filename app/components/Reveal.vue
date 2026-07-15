<template lang="pug">
  .overflow-hidden(ref="root")
    .will-change-transform(ref="inner" data-reveal-inner)
      slot
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const props = withDefaults(
  defineProps<{
    y?: number;
    delay?: number;
    variant?: "fade" | "mask";
  }>(),
  { y: 56, delay: 0, variant: "fade" }
);

const root = ref<HTMLElement | null>(null);
const inner = ref<HTMLElement | null>(null);
const reduced = useReducedMotion();

onMounted(() => {
  if (!root.value || !inner.value) return;
  gsap.registerPlugin(ScrollTrigger);

  if (reduced.value) {
    gsap.set(inner.value, {
      clearProps: "all",
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
    });
    return;
  }

  if (props.variant === "mask") {
    gsap.fromTo(
      inner.value,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        delay: props.delay,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: root.value,
          start: "top 90%",
          once: true,
        },
      }
    );
    return;
  }

  gsap.fromTo(
    inner.value,
    { y: props.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: props.delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: root.value,
        start: "top 90%",
        once: true,
      },
    }
  );
});
</script>
