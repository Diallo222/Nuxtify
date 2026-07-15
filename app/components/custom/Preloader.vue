<template lang="pug">
  .fixed.inset-0.bg-ink.flex.flex-col.items-center.justify-center(class="z-[10000]" 
    v-if="!done"
    ref="root"
    aria-hidden="true"
  )
    p.font-display.font-extrabold.uppercase.text-paper.tracking-tighter.text-5xl(
      class="md:text-8xl"
      ref="word"
    ) NUXTIFY
    .mt-8.h-px.w-48.bg-ink-muted.overflow-hidden(class="md:w-80")
      .h-full.bg-accent.origin-left(ref="bar" style="transform: scaleX(0)")
</template>

<script setup lang="ts">
import gsap from "gsap";
import { useUiStore } from "~/stores/ui";

const ui = useUiStore();
const done = computed({
  get: () => ui.preloaderDone,
  set: (v: boolean) => {
    if (v) ui.setPreloaderDone();
  },
});

const root = ref<HTMLElement | null>(null);
const word = ref<HTMLElement | null>(null);
const bar = ref<HTMLElement | null>(null);

onMounted(() => {
  if (ui.preloaderDone) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    ui.setPreloaderDone();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(root.value, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
        onComplete: () => ui.setPreloaderDone(),
      });
    },
  });

  tl.fromTo(
    word.value,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
  ).to(bar.value, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, "-=0.2");
});
</script>
