<template lang="pug">
    .container.flex.flex-col.justify-center.items-center
        h2.text-xl.text-left.font-bold.text-black.uppercase.my-8(
            class="md:text-5xl" 
            v-if="products.length === 0" 
            aria-live="polite"
        ) You have no products in your cart for the moment
        .flex.flex-col.justify-center.items-center.w-full.gap-4(class="md:flex-row" v-else)
            .flex.flex-col.w-full.gap-2.bg-white.shadow-md.py-4.px-2(class="md:w-1/3 lg:px-6")
                h2.text-xl.font-semibold.text-gray-800 Your Cart
                CartItem(
                    v-for="product in products" 
                    :key="product.id" 
                    :product="product" 
                    :quantity="product.quantity"
                )

            .bg-white.shadow-md.p-6.w-full.space-y-4(class="md:w-1/3")
                h2.text-xl.font-semibold.text-gray-800 Order Summary
                .flex.justify-between.items-center
                    p.text-gray-600.text-base Subtotal
                    p.font-semibold.text-gray-800 ${{ totalAmount.toFixed(2) }}
                .flex.justify-between.items-center
                    p.text-gray-600.text-base Shipping
                    p.font-semibold.text-gray-800 Free
                .flex.justify-between.items-center
                    p.text-gray-600.text-base Discount
                    p.font-semibold.text-gray-800 $0
                .border-t.border-gray-300.pt-4.flex.justify-between.items-center
                    p.text-lg.font-semibold.text-gray-800 Total
                    p.text-lg.font-semibold.text-zinc-900 ${{ totalAmount.toFixed(2) }}
                button.bg-zinc-900.text-white.font-semibold.py-2.px-4.mt-6.w-full.transition(type="button" @click="checkout") Proceed to Checkout
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
