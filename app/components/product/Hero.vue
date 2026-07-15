<template lang="pug">
  section.relative.overflow-hidden.bg-ink(class="h-[100svh] min-h-[560px]" ref="section")
    .absolute.inset-0.overflow-hidden(ref="imageWrap")
      .hero-veil.absolute.inset-0.z-10.pointer-events-none
      NuxtImg.absolute.inset-0.w-full.h-full.object-cover.scale-110(
        v-if="featured"
        ref="imageEl"
        :src="featured.image"
        :alt="featured.title"
        :key="featured.id"
      )
    .relative.z-20.h-full.flex.flex-col.justify-end.px-5.pb-16(class="md:px-10 lg:px-16 md:pb-24")
      p.text-accent.text-xs.uppercase.mb-4(class="tracking-[0.3em]" ref="eyebrow") Concept store
      h1.font-display.font-extrabold.uppercase.tracking-tighter.text-paper(
        class="leading-[0.85] text-[18vw] md:text-[9vw]"
        ref="brand"
      ) NUXTIFY
      p.max-w-md.text-ash.text-sm.mt-4.leading-relaxed(class="md:text-base" ref="sub")
        | Fashion, jewelry, and electronics — staged as one kinetic retail experience.
      .flex.flex-wrap.gap-3.mt-8(ref="ctas")
        Magnetic(tag="div")
          NuxtLink.inline-block.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.px-8.py-4(
            to="/categories"
            data-cursor="hover"
          ) Enter shop
        Magnetic(tag="div")
          NuxtLink.inline-block.border.border-white-20.text-paper.font-display.font-bold.uppercase.tracking-wide.px-8.py-4.transition(
            to="/about"
            class="hover:border-accent hover:text-accent"
            data-cursor="hover"
          ) Our story
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Product from "~/stores/types";

const props = defineProps<{
  products: Product[];
}>();

const featured = computed(() => props.products[0] || null);
const section = ref<HTMLElement | null>(null);
const imageWrap = ref<HTMLElement | null>(null);
const imageEl = ref<HTMLElement | null>(null);
const eyebrow = ref<HTMLElement | null>(null);
const brand = ref<HTMLElement | null>(null);
const sub = ref<HTMLElement | null>(null);
const ctas = ref<HTMLElement | null>(null);
const reduced = useReducedMotion();

onMounted(async () => {
  await nextTick();
  if (reduced.value) return;

  gsap.registerPlugin(ScrollTrigger);

  const img = imageWrap.value?.querySelector("img");

  const tl = gsap.timeline({ delay: 0.2 });

  if (imageWrap.value) {
    gsap.set(imageWrap.value, { clipPath: "inset(100% 0% 0% 0%)" });
    tl.to(imageWrap.value, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      ease: "power4.inOut",
    });
  }

  if (img) {
    tl.to(
      img,
      { scale: 1, duration: 1.4, ease: "power3.out" },
      "-=0.9"
    );
  }

  tl.fromTo(eyebrow.value, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5")
    .fromTo(
      brand.value,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
      "-=0.2"
    )
    .fromTo(sub.value, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
    .fromTo(
      ctas.value,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.35"
    );

  if (img && section.value) {
    gsap.to(img, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: section.value,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
});
</script>

<style scoped>
.hero-veil {
  background:
    linear-gradient(
      to bottom,
      color-mix(in srgb, var(--color-ink) 35%, transparent),
      transparent 35%,
      var(--color-ink)
    ),
    radial-gradient(
      ellipse at 65% 40%,
      transparent 0%,
      color-mix(in srgb, var(--color-ink) 55%, transparent) 70%
    );
}
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
