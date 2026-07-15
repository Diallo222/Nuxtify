<template lang="pug">
  section.relative.py-24(ref="section")
    .px-5.mb-10(class="md:px-10 lg:px-16")
      h2.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl(class="md:text-6xl")
        | Categories
      p.text-ash.text-sm.mt-2.max-w-md Track the aisle — fashion to signal electronics.
      .mt-6.h-px.w-full.bg-ink-muted.overflow-hidden.hidden(class="md:block")
        .h-full.bg-accent.origin-left(ref="progress" style="transform: scaleX(0)")

    //- Mobile: native horizontal scroll. Desktop: pinned scrub on pinWrap.
    .pin-wrap(ref="pinWrap")
      .track-outer.overflow-x-auto.px-5.pb-4.snap-x.snap-mandatory(
        class="md:overflow-hidden md:px-0 md:pb-0"
        ref="trackOuter"
      )
        .flex.gap-4.w-max.px-0(
          class="md:gap-6 md:px-10 lg:px-16"
          ref="track"
        )
          NuxtLink.relative.shrink-0.overflow-hidden.bg-ink-muted.group(
            class="w-[75vw] h-[55vw] max-w-md max-h-80 snap-start md:w-[28rem] md:h-80"
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

const props = defineProps<{ categories: string[] }>();

const section = ref<HTMLElement | null>(null);
const pinWrap = ref<HTMLElement | null>(null);
const trackOuter = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
const progress = ref<HTMLElement | null>(null);

const isDesktop = ref(false);
const reduced = useReducedMotion();

let scrubTrigger: ScrollTrigger | null = null;
let entranceTween: gsap.core.Tween | null = null;
let mq: MediaQueryList | null = null;
let resizeObserver: ResizeObserver | null = null;
let initTimer: ReturnType<typeof setTimeout> | null = null;

const imageFor = (cat: string) => {
  const map: Record<string, string> = {
    electronics: "/images/electronics.png",
    jewelery: "/images/jewelery.png",
    "men's clothing": "/images/men's clothing.png",
    "women's clothing": "/images/women's clothing.png",
  };
  return map[cat] || "/images/electronics.png";
};

const getTravel = () => {
  if (!track.value || !trackOuter.value) return 0;
  const total = track.value.scrollWidth;
  const view = trackOuter.value.clientWidth || window.innerWidth;
  return Math.max(0, total - view);
};

const killScrub = () => {
  scrubTrigger?.kill();
  scrubTrigger = null;
  if (track.value) gsap.set(track.value, { clearProps: "transform,x" });
  if (progress.value) gsap.set(progress.value, { scaleX: 0 });
};

const setupScrub = async () => {
  killScrub();
  await nextTick();

  if (!import.meta.client) return;
  if (!pinWrap.value || !track.value || !trackOuter.value) return;
  if (!props.categories.length) return;

  // Wait a frame so images/layout settle
  await new Promise((r) => requestAnimationFrame(() => r(null)));

  if (!isDesktop.value || reduced.value) {
    killScrub();
    return;
  }

  const travel = getTravel();
  if (travel < 24) return;

  gsap.registerPlugin(ScrollTrigger);

  scrubTrigger = ScrollTrigger.create({
    trigger: pinWrap.value,
    start: "top top+=72",
    end: () => `+=${getTravel()}`,
    pin: true,
    pinSpacing: true,
    // Transform pins play nicer with Lenis than position:fixed
    pinType: "transform",
    scrub: 0.6,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    animation: gsap.fromTo(
      track.value,
      { x: 0 },
      {
        x: () => -getTravel(),
        ease: "none",
      }
    ),
    onUpdate: (self) => {
      if (progress.value) gsap.set(progress.value, { scaleX: self.progress });
    },
  });

  ScrollTrigger.refresh();
};

const playEntrance = () => {
  entranceTween?.kill();
  if (reduced.value || !track.value || !props.categories.length) return;

  const panels = track.value.querySelectorAll("[data-cat-panel]");
  if (!panels.length) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.set(panels, { clearProps: "opacity,transform" });

  entranceTween = gsap.fromTo(
    panels,
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      overwrite: true,
    }
  );
};

const scheduleInit = () => {
  if (initTimer) clearTimeout(initTimer);
  initTimer = setTimeout(async () => {
    playEntrance();
    await setupScrub();
  }, 50);
};

const onMq = (e: MediaQueryListEvent) => {
  isDesktop.value = e.matches;
  scheduleInit();
};

watch(
  () => props.categories.slice(),
  async () => {
    await nextTick();
    scheduleInit();
  },
  { deep: true }
);

onMounted(async () => {
  await nextTick();
  mq = window.matchMedia("(min-width: 768px)");
  isDesktop.value = mq.matches;
  mq.addEventListener("change", onMq);

  if (track.value && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => {
      if (scrubTrigger) {
        scrubTrigger.refresh();
      } else if (props.categories.length && isDesktop.value) {
        scheduleInit();
      }
    });
    resizeObserver.observe(track.value);
  }

  scheduleInit();
});

onUnmounted(() => {
  if (initTimer) clearTimeout(initTimer);
  mq?.removeEventListener("change", onMq);
  resizeObserver?.disconnect();
  entranceTween?.kill();
  killScrub();
});
</script>
