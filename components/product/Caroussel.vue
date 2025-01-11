<template lang="pug">
  .container.flex.flex-col.mt-4(v-if="!loading && products.length > 0")
    h2.text-xl.text-left.font-bold.text-black.uppercase(class="md:text-2xl") Top deals
    .overflow-hidden.p-1.w-full.flex.flex-row.items-center.justify-between(class="md:p-6")
      button.bg-zinc-900.p-1.flex.items-center.justify-center.rounded-full.transition(class="md:p-2 hover:scale-110" @click="onPrevClick" aria-label="Prev")
        Icon(name="mdi:menu-left" size="1.5em" style="color: white")
      .flex.flex-col-reverse.w-full.items-center.justify-between.transition.pl-2(class="md:flex-row md:pl-6" ref="scrollRef")
          .text-left.space-y-2(class="md:w-1/2 md:space-y-12")
            h2.text-lg.font-bold(class="md:text-3xl" ref="titleRef") {{ currentProductData.title }}
            p.text-gray-700.text-sm.line-clamp-3(class="md:text-lg md:line-clamp-none" ref="descriptionRef") {{ currentProductData.description }}
            .flex.flex-row.gap-4(ref="buttonsRef")
              button.bg-zinc-900.text-white.text-xs.py-2.px-4.shadow-sm.transition.uppercase(class="md:text-lg hover:bg-white hover:text-black hover:border-2 hover:border-zinc-900") Buy Now
              button.text-black.text-xs.border-2.border-zinc-900.py-2.px-4.shadow-sm.transition.uppercase(class="md:text-lg hover:bg-zinc-900 hover:text-white") Learn More
          img.object-contain.h-40(:src="currentProductData.image" alt="Product Image" class="md:w-1/2 md:h-96" ref="imageRef")
      button.bg-zinc-900.p-1.flex.items-center.justify-center.rounded-full.transition(class="md:p-2 hover:scale-110" @click="onNextClick" aria-label="Next")
        Icon(name="mdi:menu-right" size="1.5em" style="color: white")
  </template>

<script setup lang="ts">
import gsap from "gsap";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const currentProduct = ref(0);
const currentProductData = computed(() => props.products[currentProduct.value]);

const titleRef = ref(null);
const descriptionRef = ref(null);
const imageRef = ref(null);
const buttonsRef = ref(null);

let timer: number | null = null;

const resetTimer = () => {
  if (timer !== null) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    onNextClick();
  }, 5000);
};

const animateTransition = (direction: "next" | "prev") => {
  const tl = gsap.timeline();
  const offset = direction === "next" ? "-100%" : "100%";

  // Animate out current content while simultaneously animating in the new content
  tl.to([titleRef.value, descriptionRef.value, buttonsRef.value], {
    x: offset,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power1.inOut",
  })
    .to(
      imageRef.value,
      {
        x: offset,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "<"
    )
    .call(() => {
      currentProduct.value =
        direction === "next"
          ? (currentProduct.value + 1) % props.products.length
          : (currentProduct.value - 1 + props.products.length) %
            props.products.length;
    })
    .add(() => {
      // Start animating the new content into view
      gsap.fromTo(
        [titleRef.value, descriptionRef.value, buttonsRef.value],
        { x: -offset, opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power1.inOut",
        }
      );
      gsap.fromTo(
        imageRef.value,
        { x: -offset, opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        }
      );
    });
};

const onPrevClick = () => {
  animateTransition("prev");
  resetTimer();
};

const onNextClick = () => {
  animateTransition("next");
  resetTimer();
};

onMounted(() => {
  resetTimer();
  onBeforeUnmount(() => {
    if (timer !== null) {
      clearInterval(timer);
    }
  });
});
</script>
