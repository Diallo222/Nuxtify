<template lang="pug">
  div
    ProductHero(:products="products")
    CategoryList
    ProductGrid(
      title="Latest"
      :products="products.slice(0, 8)"
      :loading="loading"
      mosaic
      link="/categories"
    )
    section.px-5.py-24(class="md:px-10 lg:px-16")
      .grid.gap-10.items-end.border-t.border-white-10.pt-16(
        class="lg:grid-cols-12 lg:gap-16"
      )
        Reveal(variant="mask" class="block lg:col-span-7")
          .space-y-6
            p.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl.leading-none(
              class="md:text-6xl lg:text-7xl"
            ) Retail as theater. Objects as spectacle.
            p.text-ash.max-w-lg Not another catalog — a kinetic stage for whatever Fake Store ships next.
            Magnetic(tag="div")
              NuxtLink.inline-block.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.px-8.py-4(
                to="/about"
                data-cursor="hover"
              ) Read the manifesto
        Reveal(variant="mask" :delay="0.12" class="block lg:col-span-5" v-if="still")
          .relative.overflow-hidden.bg-ink-muted(class="aspect-[4/5]")
            NuxtImg.w-full.h-full.object-contain.p-8(
              :src="still.image"
              :alt="still.title"
            )
            .absolute.bottom-0.left-0.right-0.p-4.bg-gradient-to-t.from-ink.to-transparent
              p.uppercase.tracking-widest.text-ash(class="text-[10px]") Featured still
              p.font-display.font-bold.line-clamp-1 {{ still.title }}
    CustomLoader(:loading="loading")
</template>

<script setup lang="ts">
import { useProductsStore } from "@/stores/products";
import { useFavoritesStore } from "~/stores/favorites";

const productStore = useProductsStore();
const favoritesStore = useFavoritesStore();

onMounted(() => {
  productStore.fetchProducts();
  productStore.fetchCategories();
  favoritesStore.loadFavorites();
});

const products = computed(() => productStore.allProducts);
const loading = computed(() => productStore.loading);
const still = computed(() => products.value[1] || products.value[0] || null);
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
