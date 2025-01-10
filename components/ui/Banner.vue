<template lang="pug">
    .scrollable-banner.relative.overflow-hidden.bg-white.w-full.p-6.rounded-lg.shadow-md
      // Scrollable container for products
      .products-container.flex.gap-6.w-full.h-full(class="scroll-content")
        .product-card.flex-shrink-0.flex.flex-col.items-center.justify-between.p-6.rounded-lg.shadow-lg(class="md:flex-row w-[90%] md:w-[50%]" v-for="product in products" :key="product.id")
          .text-content.flex-1.text-left(class="md:mr-6")
            h2.text-2xl.font-bold.mb-2 {{ product.title }}
            p.text-gray-700.mb-4 {{ product.description }}
            button.bg-blue-600.text-white.py-2.px-4.rounded.shadow-lg.transition(class="hover:bg-blue-700") Buy Now
          .image-content.flex-1.text-center
            img.object-contain.h-48.w-full.max-w-xs(:src="product.image" alt="Product Image")
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
