<template lang="pug">
    .p-2.relative.space-y-2(class="w-[10rem] md:w-[12rem] lg:w-[16rem]" )
        button.p-2.flex.items-center.justify-center.rounded-full.absolute.top-2.right-2.transition(class="hover:bg-gray-200 hover:scale-110" :class="{ 'bg-black': isFavorite }, {'hover:bg-black': isFavorite}" @click="toggleFavorite" aria-label="Toggle favorite")
            Icon.self-center(:class="isFavorite ? 'text-white' : 'text-black'" :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'")
        img.w-full.object-contain.h-24(class="md:h-52" :src="product.image" alt="Card image cap" @click="handleclick(product)")
        .mt-2
            p.text-sm.font-semibold.text-gray-600.uppercase {{product.category}}
            .space-y-2
            p.text-base.font-semibold.truncate {{product.title}}
            .flex.items-center.justify-between
                p.text-base.font-semibold.text-green-600 ${{product.price}}
                .flex.items-center
                    Icon.text-yellow-400(name="mdi:star")
                    p.text-base.font-semibold.text-gray-600
                        | {{product.rating?.rate || 'N/A'}} <span>| {{ product.rating?.count || '0' }}</span>
        button.w-full.border.border-black.p-2.transition.uppercase.text-base.font-semibold(v-if="!isInCart" @click="addToCart(product)" class="md:text-lg hover:bg-zinc-900 hover:text-white hover:scale-110") Add to cart
        button.w-full.border.border-black.p-2.transition.uppercase.text-base.text-white.bg-zinc-900.font-semibold(v-if="isInCart" @click="removeFromCart(product)" class="md:text-lg hover:bg-white hover:text-black hover:scale-110") Remove from cart
</template>

<script setup lang="ts">
import { useFavoritesStore } from "~/store/favorites";
import { useProductsStore } from "~/store/products";
import { useCartStore } from "~/store/cart";

const favoritesStore = useFavoritesStore();
const productStore = useProductsStore();
const cartStore = useCartStore();

const router = useRouter();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(props.product);
});
const isInCart = computed(() => {
  return cartStore.inCart(props.product.id);
});

const toggleFavorite = () => {
  favoritesStore.switchFavorite(props.product);
};
const handleclick = (product: any) => {
  productStore.selectedProduct = product;
  router.push(`/products/${product.id}`);
};
const addToCart = (product: any) => {
  cartStore.addProduct(product, 1);
};
const removeFromCart = (product: any) => {
  cartStore.removeProduct(product);
};
</script>
