<template lang="pug">
  .px-5.py-24.flex.flex-col.items-center.justify-center(
    class="min-h-[70vh] md:px-10"
    v-if="order"
  )
    p.text-accent.text-xs.uppercase.mb-4(class="tracking-[0.3em]") Curtain call
    h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.leading-none.text-center(
      class="md:text-8xl"
      ref="title"
    ) Thank you
    p.text-ash.mt-6.max-w-md.text-center Your order is staged. Confirmation is theatrical — this demo sends no email.

    .mt-12.w-full.max-w-lg.border.border-white-10.p-6.space-y-4.text-left
      .flex.justify-between.gap-4.text-sm
        span.text-ash.uppercase.tracking-widest Order
        span.font-display.font-bold {{ order.id }}
      .flex.justify-between.gap-4.text-sm
        span.text-ash.uppercase.tracking-widest Items
        span {{ order.items.length }}
      .flex.justify-between.gap-4.text-sm
        span.text-ash.uppercase.tracking-widest Ship to
        span.text-right {{ order.shipping.fullName }}
          br
          span.text-ash {{ order.shipping.city }}, {{ order.shipping.country }}
      .flex.justify-between.gap-4.border-t.border-white-10.pt-4
        span.font-display.font-bold Total
        span.font-display.font-bold.text-2xl ${{ order.total.toFixed(2) }}
      ul.space-y-3.pt-2
        li.flex.gap-3.items-center(v-for="item in order.items" :key="item.id")
          NuxtImg.w-12.h-12.object-contain.bg-ink-muted.p-1(
            :src="item.image"
            :alt="item.title"
          )
          .min-w-0.flex-1
            p.text-sm.font-medium.line-clamp-1 {{ item.title }}
            p.text-ash.text-xs ×{{ item.quantity }}
          span.text-sm ${{ (item.price * item.quantity).toFixed(2) }}

    .mt-12.flex.flex-wrap.justify-center.gap-3
      Magnetic(tag="div")
        NuxtLink.bg-accent.text-ink.font-display.font-bold.uppercase.px-8.py-4(
          to="/categories"
          data-cursor="hover"
        ) Continue shopping
      NuxtLink.border.border-white-20.text-paper.font-display.font-bold.uppercase.px-8.py-4.transition(
        to="/blog"
        class="hover:border-accent hover:text-accent"
        data-cursor="hover"
      ) Journal

  .px-5.py-32.text-center(v-else class="min-h-[70vh]")
    p.font-display.font-bold.text-3xl No order on stage
    p.text-ash.mt-3 Place a demo order from checkout to see a receipt.
    Magnetic.mt-8.inline-block(tag="div")
      NuxtLink.bg-accent.text-ink.font-display.font-bold.uppercase.px-8.py-4(
        to="/cart"
        data-cursor="hover"
      ) View cart
</template>

<script setup lang="ts">
import gsap from "gsap";
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();
const order = computed(() => cartStore.lastOrder);
const title = ref<HTMLElement | null>(null);
const reduced = useReducedMotion();

onMounted(() => {
  if (reduced.value || !title.value || !order.value) return;
  gsap.fromTo(
    title.value,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
  );
});
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
