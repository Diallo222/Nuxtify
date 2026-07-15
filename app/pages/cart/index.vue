<template lang="pug">
  .px-5.py-16(class="md:px-10 lg:px-16")
    h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.mb-10(
      class="md:text-7xl"
    ) Cart
    .grid.gap-12(class="lg:grid-cols-12" v-if="products.length")
      .space-y-2(class="lg:col-span-7")
        CartItem(
          v-for="product in products"
          :key="product.id"
          :product="product"
          :quantity="product.quantity || 1"
        )
      aside.border.border-white-10.p-6.h-fit.space-y-4(class="lg:col-span-5 lg:sticky lg:top-28")
        h2.font-display.font-bold.uppercase.tracking-tight.text-xl Summary
        .flex.justify-between.text-sm
          span.text-ash Subtotal
          span ${{ totalAmount.toFixed(2) }}
        .flex.justify-between.text-sm
          span.text-ash Shipping
          span Free
        .border-t.border-white-10.pt-4.flex.justify-between.items-center
          span.font-display.font-bold.text-lg Total
          span.font-display.font-bold.text-2xl ${{ totalAmount.toFixed(2) }}
        Magnetic(tag="div")
          button.w-full.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.py-4(
            type="button"
            data-cursor="hover"
            @click="checkout"
          ) Proceed to checkout
    .py-24.text-center(v-else)
      p.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl(class="md:text-5xl") Empty stage
      p.text-ash.mt-4 Your cart is waiting for its first cue.
      Magnetic.mt-8.inline-block(tag="div")
        NuxtLink.bg-accent.text-ink.font-display.font-bold.uppercase.px-8.py-4(
          to="/categories"
          data-cursor="hover"
        ) Shop collections
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();
const router = useRouter();
const products = computed(() => cartStore.basket);
const totalAmount = computed(() => cartStore.totalAmount());

const checkout = () => router.push("/cart/checkout");
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
