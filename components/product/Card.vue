<template lang="pug">
    .bg-white.p-2.relative(class="w-[12rem]")
        button.bg-gray-100.p-2.flex.items-center.justify-center.rounded-full.absolute.top-2.right-2.transition(class="hover:bg-gray-200 hover:scale-110" :class="{ 'bg-red-400': isFavorite }, {'hover:bg-red-300': isFavorite}" @click="toggleFavorite" aria-label="Toggle favorite")
            Icon.self-center(:name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'")
        img.w-full.object-contain.h-30(class="md:h-40" :src="product.image" alt="Card image cap")
        .mt-2
            p.text-xs.font-semibold.text-gray-600.uppercase {{product.category}}
            .mt-1
            p.text-sm.font-semibold.truncate {{product.title}}
            .flex.items-center.justify-between.space-y-1
                p.text-sm.font-semibold.text-green-600 ${{product.price}}
                .flex.items-center
                    Icon.text-yellow-400(name="mdi:star")
                    p.text-xs.font-semibold.text-gray-600
                        | {{product.rating?.rate || 'N/A'}} <span>| {{ product.rating?.count || '0' }}</span>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "~/store/favorites";
const favoritesStore = useFavoritesStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(props.product);
});

console.log(props.product.id, isFavorite.value);

const toggleFavorite = () => {
  favoritesStore.switchFavorite(props.product);
};
</script>
