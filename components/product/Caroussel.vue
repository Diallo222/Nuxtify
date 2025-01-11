<template lang="pug">
    .mt-4.overflow-hidden.w-full.p-6.flex.flex-row.items-center.justify-between.rounded-3xl(v-if="!loading && products.length > 0")
      button.bg-zinc-900.p-2.flex.items-center.justify-center.rounded-full.transition(class=" hover:scale-110" @click="onPrevClick" aria-label="Prev")
        Icon(name="mdi:menu-left" size="1.5em" style="color: white")
      .flex.flex-row.w-full.items-center.justify-between.transition-all.duration-1000.pl-6
          .text-left.space-y-12(class="w-1/2")
            h2.text-3xl.font-bold {{ currentProductData.title }}
            p.text-gray-700 {{ currentProductData.description }}
            button.bg-zinc-900.text-white.py-2.px-4.shadow-sm.transition.uppercase(class="hover:bg-white hover:text-black hover:border-2 hover:border-zinc-900") Buy Now
          img.object-contain.h-96(:src="currentProductData.image" alt="Product Image" class="md:w-1/2")
      button.bg-zinc-900.p-2.flex.items-center.justify-center.rounded-full.transition(class=" hover:scale-110" @click="onNextClick" aria-label="Next")
        Icon(name="mdi:menu-right" size="1.5em" style="color: white")
  </template>

<script setup lang="ts">
import gsap from "gsap";

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

const onPrevClick = () => {
  currentProduct.value =
    (currentProduct.value - 1 + props.products.length) % props.products.length;
};

const onNextClick = () => {
  currentProduct.value = (currentProduct.value + 1) % props.products.length;
};

const scrollRef = ref(null);

onMounted(() => {
  if (scrollRef.value) {
    const container = scrollRef.value;

    // GSAP horizontal scroll animation
    gsap.to(container, {
      xPercent: -100 * (props.products.length - 1),
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        pin: true,
      },
    });
  }
});
</script>
