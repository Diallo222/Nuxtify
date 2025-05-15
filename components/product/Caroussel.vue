<template lang="pug">
  .container.flex.flex-col.mt-4(
    v-if="!loading && products.length > 0"
    )
    h2.text-xl.text-left.font-bold.text-black.uppercase(
      class="md:text-5xl"
      ) Top deals
      
    .overflow-hidden.p-1.w-full.flex.flex-row.items-center.justify-between.relative(
      class="md:p-6"
      )
      button.bg-zinc-900.p-1.flex.items-center.justify-center.rounded-full.transition.shadow-md.z-10(
        class="md:p-2 hover:scale-110 hover:bg-zinc-800" 
        @click="onPrevClick" 
        aria-label="Previous product")
        Icon(
          name="mdi:menu-left" 
          size="1.5em" 
          style="color: white")

      .flex.flex-col-reverse.w-full.items-center.justify-between.transition.pl-2(
        class="md:flex-row md:pl-6" 
        ref="scrollRef")

          .text-left.space-y-2(class="md:w-1/2 md:space-y-8 md:pr-8")
            h2.text-lg.font-bold(
              class="md:text-3xl" 
              ref="titleRef"
              ) {{ currentProductData.title }}
            p.text-gray-700.text-sm.line-clamp-3(
              class="md:text-lg md:line-clamp-none" ref="descriptionRef"
              ) {{ currentProductData.description }}
            .flex.flex-row.gap-4.mt-4(ref="buttonsRef")
              button.bg-zinc-900.text-white.text-xs.py-2.px-4.shadow-sm.transition.uppercase(
                class="md:text-lg hover:bg-white hover:text-black hover:border-2 hover:border-zinc-900"
                @click="handleClick(currentProductData)"
                ) Buy Now
              button.text-black.text-xs.border-2.border-zinc-900.py-2.px-4.shadow-sm.transition.uppercase(
                class="md:text-lg hover:bg-zinc-900 hover:text-white"
                @click="handleClick(currentProductData, true)"
                ) Learn More

          .relative(class="md:w-1/2")
            img.object-contain.h-40.transition-all.duration-300(
              :src="currentProductData.image" 
              alt="Product Image" 
              class="md:h-96 hover:scale-105" 
              ref="imageRef")
            .absolute.top-0.left-0.p-2.bg-red-500.text-white.text-xs.font-bold.rounded-br-md(
              v-if="currentProductData.discount"
              ) -{{ currentProductData.discount }}%

      button.bg-zinc-900.p-1.flex.items-center.justify-center.rounded-full.transition.shadow-md.z-10(
        class="md:p-2 hover:scale-110 hover:bg-zinc-800" 
        @click="onNextClick" 
        aria-label="Next product")
        Icon(name="mdi:menu-right" size="1.5em" style="color: white")
      
    .flex.justify-center.mt-4.gap-2
      .w-2.h-2.rounded-full.transition-all.duration-300.cursor-pointer(
        v-for="(_, index) in products" 
        :key="index"
        :class="currentProduct === index ? 'bg-zinc-900 scale-125' : 'bg-zinc-300 hover:bg-zinc-400'"
        @click="goToSlide(index)"
      )
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useProductsStore } from "~/store/products";
const productStore = useProductsStore();
const router = useRouter();
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

const handleClick = (product: any, isLearnMore: boolean = false) => {
  productStore.selectedProduct = product;
  router.push(`/products/${product.id}${isLearnMore ? "?info=true" : ""}`);
};
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
    duration: 0.4,
    stagger: 0.08,
    ease: "power2.inOut",
  })
    .to(
      imageRef.value,
      {
        x: offset,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.inOut",
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
        { x: -offset, opacity: 0, scale: 0.95 },
        {
          x: "0%",
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        imageRef.value,
        { x: -offset, opacity: 0, scale: 0.9 },
        {
          x: "0%",
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    });
};

const goToSlide = (index: number) => {
  if (index === currentProduct.value) return;

  const direction = index > currentProduct.value ? "next" : "prev";
  const tl = gsap.timeline();

  tl.to(
    [titleRef.value, descriptionRef.value, buttonsRef.value, imageRef.value],
    {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.inOut",
    }
  )
    .call(() => {
      currentProduct.value = index;
    })
    .add(() => {
      gsap.fromTo(
        [
          titleRef.value,
          descriptionRef.value,
          buttonsRef.value,
          imageRef.value,
        ],
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    });

  resetTimer();
};

const onPrevClick = () => {
  animateTransition("prev");
  resetTimer();
};

const onNextClick = () => {
  animateTransition("next");
  resetTimer();
};

// Handle keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "ArrowLeft") {
    onPrevClick();
  } else if (e.key === "ArrowRight") {
    onNextClick();
  }
};

onMounted(() => {
  resetTimer();
  window.addEventListener("keydown", handleKeydown);

  onBeforeUnmount(() => {
    if (timer !== null) {
      clearInterval(timer);
    }
    window.removeEventListener("keydown", handleKeydown);
  });
});
</script>

<style scoped>
.container {
  position: relative;
}
</style>
