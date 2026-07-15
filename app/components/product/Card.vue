<template lang="pug">
  article.group.relative.flex.flex-col.gap-3(
    :class="[articleClass, flashClass]"
    data-reveal
  )
    .relative.overflow-hidden.bg-ink-muted(class="aspect-[3/4]")
      button.absolute.top-3.right-3.z-10.p-2.text-paper.transition(
        type="button"
        aria-label="Toggle favorite"
        class="hover:text-accent"
        data-cursor="hover"
        @click="toggleFavorite"
      )
        Icon(:name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" size="1.25em")
      button.absolute.inset-0.w-full.h-full(type="button" @click="goToProduct" data-cursor="hover")
        NuxtImg.w-full.h-full.object-contain.p-6.transition.duration-700(
          class="group-hover:scale-105"
          :class="imageClass"
          :src="product.image"
          :alt="product.title"
          loading="lazy"
        )
      .absolute.inset-x-0.bottom-0.p-3.bg-gradient-to-t.from-ink.via-ink-80.to-transparent.transition.duration-500(
        class="translate-y-0 md:translate-y-full md:group-hover:translate-y-0"
      )
        button.w-full.bg-accent.text-ink.font-display.font-bold.uppercase.text-xs.py-3.tracking-wide.transition(
          type="button"
          data-cursor="hover"
          class="active:scale-95 active:brightness-90 hover:brightness-110"
          @click.stop="toggleCart"
        ) {{ isInCart ? 'Remove' : 'Quick add' }}
    .space-y-1
      p.uppercase.tracking-widest.text-ash(class="text-[10px]") {{ product.category }}
      button.text-left.font-display.font-bold.leading-tight.line-clamp-2.transition-colors(
        type="button"
        class="hover:text-accent"
        :class="titleClass"
        @click="goToProduct"
      ) {{ product.title }}
      .flex.items-center.justify-between.gap-2
        p.font-medium ${{ product.price }}
        p.text-ash.text-xs(v-if="product.rating") ★ {{ product.rating.rate }}
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import type Product from "~/stores/types";
import { useFavoritesStore } from "~/stores/favorites";
import { useProductsStore } from "~/stores/products";
import { useCartStore } from "~/stores/cart";
import { useUiStore } from "~/stores/ui";

const props = defineProps<{
  product: Product;
  featured?: boolean;
}>();

const favoritesStore = useFavoritesStore();
const productStore = useProductsStore();
const cartStore = useCartStore();
const ui = useUiStore();
const router = useRouter();
const flashed = ref(false);

const articleClass = computed(() =>
  props.featured ? "col-span-2 row-span-2" : ""
);
const imageClass = computed(() => (props.featured ? "p-10 md:p-16" : ""));
const titleClass = computed(() =>
  props.featured ? "text-xl md:text-3xl" : "text-sm md:text-base"
);
const flashClass = computed(() => (flashed.value ? "card-flash" : ""));

const isFavorite = computed(() => favoritesStore.isFavorite(props.product));
const isInCart = computed(() => cartStore.inCart(props.product.id));

const toggleFavorite = () => {
  favoritesStore.switchFavorite(props.product);
};

const goToProduct = () => {
  productStore.setProduct(props.product);
  router.push(`/products/${props.product.id}`);
};

const toggleCart = () => {
  if (isInCart.value) {
    cartStore.removeProduct(props.product);
    toast.message("Removed from cart");
  } else {
    cartStore.addProduct(props.product, 1);
    toast.success("Added to cart");
    flashed.value = true;
    setTimeout(() => {
      flashed.value = false;
    }, 600);
    ui.openCart();
  }
};
</script>

<style scoped>
.via-ink-80 {
  --tw-gradient-via: color-mix(in srgb, var(--color-ink) 80%, transparent);
}
.from-ink {
  --tw-gradient-from: var(--color-ink);
}
.card-flash {
  outline: 1px solid var(--color-accent);
  outline-offset: 2px;
  transition: outline-color 0.6s ease;
}
</style>
