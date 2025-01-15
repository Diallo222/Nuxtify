<template lang="pug">
    .container.flex.flex-col.justify-center.items-center
        h2.text-xl.text-left.font-bold.text-black.uppercase.my-8(
            class="md:text-5xl" 
            v-if="products.length === 0" 
            aria-live="polite"
        ) You have no products in your cart for the moment
        .flex.flex-col.justify-center.items-center.w-full.gap-4(class="md:flex-row" v-else)
            .flex.flex-col.w-full.gap-2(class="md:w-1/2")
                CartItem(
                    v-for="product in products" 
                    :key="product.id" 
                    :product="product" 
                    :quantity="product.quantity"
                )
            .flex.flex-col.gap-2
                h2.text-xl.text-left.font-bold.text-black.uppercase(
                    aria-live="polite"
                ) Total products : {{ products.length }}
                h2.text-xl.text-left.font-bold.text-black.uppercase(
                aria-live="polite"
                 ) Total Amount : ${{ formattedTotal }}
                button.uppercase.text-white.text-base.bg-zinc-900.font-semibold.p-2.transition(
                    class="md:text-lg hover:bg-white hover:text-black hover:scale-110" 
                    @click="checkout"
                    ) Continue to Payment  
                button.uppercase.text-white.text-base.bg-zinc-900.font-semibold.p-2.transition(
                    class="md:text-lg hover:bg-white hover:text-black hover:scale-110" 
                    @click="goBack"
                    ) Back to Shop
    </template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import { computed } from "vue";

const cartStore = useCartStore();
const router = useRouter();
const products = computed(() => cartStore.basket);
const totalAmount = computed(() => cartStore.totalAmount());
const formattedTotal = computed(() => totalAmount.value.toFixed(2));

const checkout = () => {
  router.push("/cart/checkout");
};
const goBack = () => {
  router.push("/");
};
</script>
