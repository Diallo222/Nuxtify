<template lang="pug">
  ClientOnly
    .pointer-events-none.fixed.inset-0(class="z-[9998]" v-if="enabled" aria-hidden="true")
      .cursor-dot.fixed.top-0.left-0.w-2.h-2.rounded-full.bg-accent(class="z-[9999] -translate-x-1/2 -translate-y-1/2"
        ref="dotRef"
        :class="{ 'scale-150': hovering }"
      )
      .cursor-ring.fixed.top-0.left-0.w-10.h-10.border.border-accent-30.rounded-full.mix-blend-difference.transition-transform.duration-200(class="z-[9999] -translate-x-1/2 -translate-y-1/2"
        ref="ringRef"
        :class="{ 'scale-150 border-accent': hovering }"
      )
</template>

<script setup lang="ts">
import gsap from "gsap";
import { useUiStore } from "~/stores/ui";

const ui = useUiStore();
const enabled = ref(false);
const hovering = computed(() => ui.cursorHover);
const dotRef = ref<HTMLElement | null>(null);
const ringRef = ref<HTMLElement | null>(null);

let xTo: gsap.QuickToFunc | null = null;
let yTo: gsap.QuickToFunc | null = null;
let xRing: gsap.QuickToFunc | null = null;
let yRing: gsap.QuickToFunc | null = null;

const onMove = (e: MouseEvent) => {
  xTo?.(e.clientX);
  yTo?.(e.clientY);
  xRing?.(e.clientX);
  yRing?.(e.clientY);
};

const onOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  const interactive = target.closest(
    "a, button, [data-magnetic], [data-cursor='hover'], input, textarea, select"
  );
  ui.setCursorHover(!!interactive);
};

onMounted(() => {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduced) return;

  enabled.value = true;
  document.body.classList.add("has-custom-cursor");

  nextTick(() => {
    if (!dotRef.value || !ringRef.value) return;
    xTo = gsap.quickTo(dotRef.value, "x", { duration: 0.15, ease: "power3" });
    yTo = gsap.quickTo(dotRef.value, "y", { duration: 0.15, ease: "power3" });
    xRing = gsap.quickTo(ringRef.value, "x", { duration: 0.45, ease: "power3" });
    yRing = gsap.quickTo(ringRef.value, "y", { duration: 0.45, ease: "power3" });
  });

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseover", onOver);
});

onUnmounted(() => {
  document.body.classList.remove("has-custom-cursor");
  window.removeEventListener("mousemove", onMove);
  window.removeEventListener("mouseover", onOver);
});
</script>

<style scoped>
.border-accent-30 {
  border-color: color-mix(in srgb, var(--color-accent) 35%, transparent);
}
</style>
