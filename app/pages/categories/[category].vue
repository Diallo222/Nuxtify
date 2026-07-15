<template lang="pug">
  div
    section.relative.min-h-64.overflow-hidden.bg-ink-muted.flex.items-end(class="h-[40vh]")
      NuxtImg.absolute.inset-0.w-full.h-full.object-cover.opacity-40(
        :src="headerImage"
        :alt="category"
      )
      .absolute.inset-0.bg-gradient-to-t.from-ink.to-transparent
      .relative.z-10.px-5.pb-10(class="md:px-10 lg:px-16")
        NuxtLink.text-xs.uppercase.tracking-widest.text-ash.transition-colors(
          to="/categories"
          class="hover:text-accent"
        ) ← All categories
        h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.mt-3(
          class="md:text-7xl"
        ) {{ category }}
    ProductGrid(
      :title="`${products.length} pieces`"
      :products="products"
      :loading="loading"
    )
    CustomLoader(:loading="loading")
</template>

<script setup lang="ts">
import { useProductsStore } from "~/stores/products";
import { useFavoritesStore } from "~/stores/favorites";

const route = useRoute();
const store = useProductsStore();
const favorites = useFavoritesStore();

const category = computed(() => decodeURIComponent(String(route.params.category)));
const products = computed(() => store.categoryProducts);
const loading = computed(() => store.catProductsLoading);

const headerImage = computed(() => {
  const map: Record<string, string> = {
    electronics: "/images/electronics.png",
    jewelery: "/images/jewelery.png",
    "men's clothing": "/images/men's clothing.png",
    "women's clothing": "/images/women's clothing.png",
  };
  return map[category.value] || "/images/electronics.png";
});

onMounted(() => {
  favorites.loadFavorites();
  store.fetchCategoryProducts(category.value);
});

watch(category, (val) => store.fetchCategoryProducts(val));
</script>
