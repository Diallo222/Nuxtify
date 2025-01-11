<template lang="pug">
    .mt-4.overflow-hidden.w-full.flex.flex-row.items-center.justify-between(class="md:p-6" v-if="!loading && products.length > 0")
      button.bg-zinc-900.p-2.flex.items-center.justify-center.rounded-full.transition(class=" hover:scale-110" @click="onPrevClick" aria-label="Prev")
        Icon(name="mdi:menu-left" size="1.5em" style="color: white")
      .flex.flex-col-reverse.w-full.items-center.justify-between.transition-all.duration-1000.pl-2(class="md:flex-row md:pl-6" ref="scrollRef")
          .text-left.space-y-2(class="md:w-1/2 md:space-y-12")
            h2.text-lg.font-bold(class="md:text-3xl") {{ currentProductData.title }}
            p.text-gray-700.text-sm.line-clamp-3(class="md:text-lg md:line-clamp-none") {{ currentProductData.description }}
            .flex.flex-row.gap-4
              button.bg-zinc-900.text-white.text-xs.py-2.px-4.shadow-sm.transition.uppercase(class="md:text-lg hover:bg-white hover:text-black hover:border-2 hover:border-zinc-900") Buy Now
              button.text-black.text-xs.border-2.border-zinc-900.py-2.px-4.shadow-sm.transition.uppercase(class="md:text-lg hover:bg-zinc-900 hover:text-white") Learn More
          img.object-contain.h-40(:src="currentProductData.image" alt="Product Image" class="md:w-1/2 md:h-96")
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
</script>
