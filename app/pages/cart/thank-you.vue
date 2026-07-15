<template lang="pug">
  .px-5.py-32.text-center.flex.flex-col.items-center.justify-center(
    class="min-h-[70vh] md:px-10"
    ref="root"
  )
    p.text-accent.text-xs.uppercase.mb-4(class="tracking-[0.3em]") Curtain call
    h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.leading-none(
      class="md:text-8xl"
      ref="title"
    ) Thank you
    p.text-ash.mt-6.max-w-md Your order is staged. Confirmation is theatrical — this demo sends no email.
    Magnetic.mt-12(tag="div")
      NuxtLink.bg-accent.text-ink.font-display.font-bold.uppercase.px-8.py-4(
        to="/"
        data-cursor="hover"
      ) Return home
</template>

<script setup lang="ts">
import gsap from "gsap";

const title = ref<HTMLElement | null>(null);
const reduced = useReducedMotion();

onMounted(() => {
  if (reduced.value || !title.value) return;
  gsap.fromTo(
    title.value,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
  );
});
</script>
