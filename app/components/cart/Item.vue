<template lang="pug">
  .flex.gap-4.items-center.border-b.border-white-10.py-4
    NuxtImg.w-20.h-20.object-contain.bg-ink-muted.p-2(
      :src="product.image"
      :alt="product.title"
    )
    .flex-1.min-w-0.space-y-1
      p.uppercase.tracking-widest.text-ash(class="text-[10px]") {{ product.category }}
      p.font-display.font-bold.truncate.text-sm {{ product.title }}
      p.text-sm ${{ product.price }}
      ProductQuantifier(
        :quantity="quantity"
        @decrease="cart.decreaseQuantity(product)"
        @increase="cart.addProduct(product, 1)"
      )
    button.text-ash.transition-colors(
      type="button"
      aria-label="Remove"
      class="hover:text-accent"
      data-cursor="hover"
      @click="cart.removeProduct(product)"
    )
      Icon(name="mdi:close" size="1.2em")
</template>

<script setup lang="ts">
import type Product from "~/stores/types";
import { useCartStore } from "~/stores/cart";

defineProps<{
  product: Product;
  quantity: number;
}>();

const cart = useCartStore();
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
