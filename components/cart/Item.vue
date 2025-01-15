<template lang="pug">
  .flex.flex-row.items-center.mb-1.gap-2.w-auto
    img.object-contain.h-24(class="md:h-24 w-28" :src="product.image" :alt="`Image of ${product.title}`")
    .flex.flex-col.space-y-1(class="w-1/2")
      p.text-base.font-semibold {{ product.title }}
      p.text-sm.font-semibold.text-gray-600.uppercase {{ product.category }}
      p.text-base.font-semibold.text-black ${{ product.price.toFixed(2) }}
      .flex.items-center.justify-between
        .flex.flex-row.justify-between.items-center.bg-zinc-900.rounded
          button.px-2.transition(class="hover:scale-110" @click="decrement"  aria-label="Decrease quantity")
            Icon(name="mdi:minus" style="color: white")
          p.text-base.font-semibold.text-text-black.bg-white.py-1.px-4 {{ quantity }}
          button.px-2.transition(class="hover:scale-110" @click="increment" aria-label="Increase quantity")
            Icon(name="mdi:plus" style="color: white")
        buttonpx-2.transition.cursor-pointer(class="hover:scale-150" @click="removeFromCart" aria-label="Remove from cart")
          Icon(name="mdi:delete" style="color: black")
  </template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";

const cartStore = useCartStore();

const props = defineProps({
  product: {
    type: Object as () => {
      id: number;
      title: string;
      price: number;
      image: string;
    },
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const increment = () => {
  cartStore.addProduct(props.product, 1);
};

const decrement = () => {
  if (props.quantity > 1) {
    cartStore.decreaseQuantity(props.product);
  } else {
    cartStore.removeProduct(props.product);
  }
};

const removeFromCart = () => {
  cartStore.removeProduct(props.product);
};
</script>
