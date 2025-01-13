<template lang="pug">
    .container.flex.flex-col.justify-center.items-center.gap-4(class="md:flex-row")
        img.w-full.object-contain.h-30(class="md:h-96 md:w-1/2" :src="product.image" alt="Card image cap" )
        .flex.flex-col.space-y-2.w-full(class="md:w-1/3")
            p.text-sm.font-semibold.text-gray-600.uppercase {{product.category}}
            p.text-2xl.font-semibold {{product.title}}
            p.text-base {{product.description}}
            p.text-2xl.font-semibold.text-green-600 ${{product.price}}
            .flex.items-center
                Icon.text-yellow-400(name="mdi:star")
                p.text-xl.font-semibold.text-gray-600
                    | {{product.rating?.rate || 'N/A'}} <span>| {{ product.rating?.count || '0' }}</span>
            ProductQuantifier(@increment="increment" @decrement="decrement" v-model:quantity="quantity")
            .flex.flex-row.gap-4
                button.w-full.border.border-black.p-2.transition.uppercase.text-base.font-semibold(class="md:text-lg hover:bg-zinc-900 hover:text-white hover:scale-110") Buy Now
                button.w-full.border.border-black.p-2.transition.uppercase.text-base.font-semibold(class="md:text-lg hover:bg-zinc-900 hover:text-white hover:scale-110") Add to cart
</template>
<script setup lang="ts">
import { useProductsStore } from "~/store/products";
import { useCartStore } from "~/store/cart";
const productStore = useProductsStore();
const cartStore = useCartStore();
const product = productStore.selectedProduct;
const quantity = ref(1);

const increment = () => {
  quantity.value++;
};
const decrement = () => {
  if (quantity.value === 1) return;
  quantity.value--;
};
const addToCart = () => {
  cartStore.addProduct(product, quantity.value);
};
</script>
