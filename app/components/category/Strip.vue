<template lang="pug">
  section.relative.py-24.overflow-hidden(ref="section")
    .px-5.mb-10(class="md:px-10 lg:px-16")
      h2.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl(class="md:text-6xl")
        | Categories
      p.text-ash.text-sm.mt-2.max-w-md Track the aisle — fashion to signal electronics.
      .mt-6.h-px.w-full.bg-ink-muted.overflow-hidden.hidden(class="md:block")
        .h-full.bg-accent.origin-left(ref="progress" style="transform: scaleX(0)")

    .flex.gap-4.overflow-x-auto.px-5.pb-4.snap-x.snap-mandatory(
      class="md:overflow-visible md:px-10 lg:px-16 md:gap-6 md:pb-0"
      ref="track"
      :class="{ 'md:w-max': isDesktop }"
    )
      NuxtLink.relative.shrink-0.max-w-md.max-h-80.snap-start.overflow-hidden.bg-ink-muted.group(
        class="w-[75vw] h-[55vw] md:w-[28rem] md:h-80"
        v-for="cat in categories"
        :key="cat"
        :to="`/categories/${encodeURIComponent(cat)}`"
        data-cursor="hover"
        data-cat-panel
      )
        NuxtImg.absolute.inset-0.w-full.h-full.object-cover.opacity-50.transition.duration-700(
          class="group-hover:scale-110 group-hover:opacity-70"
          :src="imageFor(cat)"
          :alt="cat"
        )
        .absolute.inset-0.bg-gradient-to-t.from-ink.via-transparent.to-transparent
        .absolute.bottom-0.left-0.p-6
          p.font-display.font-extrabold.uppercase.tracking-tighter.text-3xl.transition-transform.duration-500(
            class="md:text-4xl group-hover:translate-x-1"
          ) {{ cat }}
          span.text-xs.uppercase.tracking-widest.text-accent.inline-block.mt-1.border-b.border-transparent.transition(
            class="group-hover:border-accent"
          ) Shop now →
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

defineProps<{ categories: string[] }>();

const section = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
const progress = ref<HTMLElement | null>(null);
const isDesktop = ref(false);
const reduced = useReducedMotion();
let scrubTrigger: ScrollTrigger | null = null;
let mq: MediaQueryList | null = null;

const imageFor = (cat: string) => {
  const map: Record<string, string> = {
    electronics: "/images/electronics.png",
    jewelery: "/images/jewelery.png",
    "men's clothing": "/images/men's clothing.png",
    "women's clothing": "/images/women's clothing.png",
  };
  return map[cat] || "/images/electronics.png";
};

const setupScrub = () => {
  scrubTrigger?.kill();
  scrubTrigger = null;

  if (!import.meta.client || !section.value || !track.value) return;
  if (!isDesktop.value || reduced.value) {
    if (track.value) gsap.set(track.value, { clearProps: "x" });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const getScroll = () =>
    Math.max(0, track.value!.scrollWidth - window.innerWidth + 64);

  scrubTrigger = ScrollTrigger.create({
    trigger: section.value,
    start: "top top",
    end: () => `+=${getScroll()}`,
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    animation: gsap.to(track.value, {
      x: () => -getScroll(),
      ease: "none",
    }),
    onUpdate: (self) => {
      if (progress.value) {
        gsap.set(progress.value, { scaleX: self.progress });
      }
    },
  });
};

const onMq = (e: MediaQueryListEvent | MediaQueryList) => {
  isDesktop.value = "matches" in e ? e.matches : (e as MediaQueryList).matches;
  setupScrub();
  ScrollTrigger.refresh();
};

onMounted(async () => {
  await nextTick();
  mq = window.matchMedia("(min-width: 768px)");
  isDesktop.value = mq.matches;
  mq.addEventListener("change", onMq);

  if (!reduced.value && section.value) {
    gsap.registerPlugin(ScrollTrigger);
    const panels = section.value.querySelectorAll("[data-cat-panel]");
    gsap.fromTo(
      panels,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.value,
          start: "top 80%",
          once: true,
        },
      }
    );
  }

  setupScrub();
});

onUnmounted(() => {
  mq?.removeEventListener("change", onMq);
  scrubTrigger?.kill();
});
</script>
