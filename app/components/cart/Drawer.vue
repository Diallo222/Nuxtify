<template lang="pug">
  Teleport(to="body")
    .fixed.inset-0(class="z-[90]" v-if="open" @keydown.esc="close")
      .absolute.inset-0.bg-ink-80.backdrop-blur-sm(@click="close")
      aside.absolute.top-0.right-0.h-full.w-full.bg-ink-elevated.border-l.border-white-10.flex.flex-col(
        class="md:max-w-md"
        ref="panel"
      )
        .flex.items-center.justify-between.px-6.py-5.border-b.border-white-10
          h2.font-display.font-bold.uppercase.tracking-tight.text-2xl Cart
          button.text-ash.transition-colors(type="button" aria-label="Close cart" class="hover:text-paper" @click="close")
            Icon(name="mdi:close" size="1.5em")

        .flex-1.overflow-y-auto.px-6.py-4.space-y-4
          p.text-ash.text-sm(v-if="!items.length") Your cart is empty.
          CartItem(
            v-for="product in items"
            :key="product.id"
            :product="product"
            :quantity="product.quantity || 1"
          )

        .px-6.py-6.border-t.border-white-10.space-y-4
          .flex.justify-between.items-center
            span.text-ash.uppercase.text-xs.tracking-widest Total
            span.font-display.font-bold.text-xl ${{ total.toFixed(2) }}
          button.w-full.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.py-4.transition(
            type="button"
            class="hover:brightness-110"
            :disabled="!items.length"
            @click="goCart"
          ) View cart
          button.w-full.border.border-white-20.text-paper.font-display.font-bold.uppercase.tracking-wide.py-4.transition(
            type="button"
            class="hover:border-accent hover:text-accent"
            :disabled="!items.length"
            @click="goCheckout"
          ) Checkout
</template>

<script setup lang="ts">
import gsap from "gsap";
import { useCartStore } from "~/stores/cart";
import { useUiStore } from "~/stores/ui";

const ui = useUiStore();
const cart = useCartStore();
const router = useRouter();

const open = computed(() => ui.cartOpen);
const items = computed(() => cart.basket);
const total = computed(() => cart.totalAmount());
const panel = ref<HTMLElement | null>(null);

const close = () => ui.closeCart();

const goCart = () => {
  close();
  router.push("/cart");
};

const goCheckout = () => {
  close();
  router.push("/cart/checkout");
};

watch(open, async (isOpen) => {
  await nextTick();
  if (!panel.value) return;
  if (isOpen) {
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      panel.value,
      { xPercent: 100 },
      { xPercent: 0, duration: 0.55, ease: "power3.out" }
    );
  } else {
    document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
.bg-ink-80 {
  background-color: color-mix(in srgb, var(--color-ink) 80%, transparent);
}
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
