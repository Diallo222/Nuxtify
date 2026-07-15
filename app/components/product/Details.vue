<template lang="pug">
  .grid.gap-10(class="lg:grid-cols-12 lg:gap-16" v-if="product" ref="root")
    .relative.bg-ink-muted.overflow-hidden(class="lg:col-span-7 lg:sticky lg:top-28 lg:self-start" ref="imageStage")
      NuxtImg.w-full.h-full.object-contain.p-6(
        class="min-h-[50vh] md:min-h-[70vh] md:p-10"
        :src="product.image"
        :alt="product.title"
        ref="image"
      )
    .flex.flex-col.gap-6(class="lg:col-span-5")
      p.text-xs.uppercase.tracking-widest.text-accent(ref="categoryEl") {{ product.category }}
      h1.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl.leading-none(
        class="md:text-5xl lg:text-6xl"
        ref="titleEl"
      ) {{ product.title }}
      .flex.items-center.gap-4(ref="priceEl")
        p.font-display.font-bold.text-3xl ${{ product.price }}
        p.text-ash.text-sm(v-if="product.rating") ★ {{ product.rating.rate }} ({{ product.rating.count }})
      p.text-ash.leading-relaxed.max-w-prose(ref="descEl") {{ product.description }}
      .flex.flex-wrap.items-center.gap-4.mt-4(ref="ctaEl")
        ProductQuantifier(
          :quantity="quantity"
          @decrease="quantity = Math.max(1, quantity - 1)"
          @increase="quantity++"
        )
        Magnetic(tag="div")
          button.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.px-8.py-4.transition(
            type="button"
            data-cursor="hover"
            class="hover:brightness-110 active:scale-95"
            @click="add"
          ) {{ inCart ? 'Update cart' : 'Add to cart' }}
        button.p-4.border.border-white-20.transition(
          type="button"
          aria-label="Favorite"
          class="hover:border-accent hover:text-accent"
          data-cursor="hover"
          @click="toggleFavorite"
        )
          Icon(:name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" size="1.25em")
</template>

<script setup lang="ts">
import gsap from "gsap";
import { toast } from "vue-sonner";
import type Product from "~/stores/types";
import { useCartStore } from "~/stores/cart";
import { useFavoritesStore } from "~/stores/favorites";
import { useUiStore } from "~/stores/ui";

const props = defineProps<{ product: Product }>();

const cart = useCartStore();
const favorites = useFavoritesStore();
const ui = useUiStore();
const quantity = ref(1);
const reduced = useReducedMotion();

const imageStage = ref<HTMLElement | null>(null);
const categoryEl = ref<HTMLElement | null>(null);
const titleEl = ref<HTMLElement | null>(null);
const priceEl = ref<HTMLElement | null>(null);
const descEl = ref<HTMLElement | null>(null);
const ctaEl = ref<HTMLElement | null>(null);

const inCart = computed(() => cart.inCart(props.product.id));
const isFavorite = computed(() => favorites.isFavorite(props.product));

const add = () => {
  cart.addProduct(props.product, quantity.value);
  toast.success("Added to cart");
  ui.openCart();
};

const toggleFavorite = () => favorites.switchFavorite(props.product);

onMounted(async () => {
  await nextTick();
  if (reduced.value) return;

  const copy = [
    categoryEl.value,
    titleEl.value,
    priceEl.value,
    descEl.value,
    ctaEl.value,
  ].filter(Boolean);

  const tl = gsap.timeline();

  if (imageStage.value) {
    gsap.set(imageStage.value, { clipPath: "inset(100% 0% 0% 0%)" });
    tl.to(imageStage.value, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.05,
      ease: "power4.inOut",
    });
  }

  tl.fromTo(
    copy,
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out" },
    "-=0.45"
  );
});
</script>

<style scoped>
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
