<template lang="pug">
  .px-5.py-16(class="md:px-10 lg:px-16")
    h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.mb-4(
      class="md:text-7xl"
    ) Checkout
    p.text-ash.mb-12 Complete the scene — demo payment only.
    .grid.gap-12(class="lg:grid-cols-12")
      .space-y-4(class="lg:col-span-7")
        h2.font-display.font-bold.uppercase.tracking-tight.text-xl Order
        .border-b.border-white-10.py-4.flex.justify-between.gap-4(
          v-for="item in cart"
          :key="item.id"
        )
          div
            p.font-medium {{ item.title }}
            p.text-ash.text-sm Qty {{ item.quantity }}
          p.font-display.font-bold ${{ ((item.price || 0) * (item.quantity || 1)).toFixed(2) }}
        .flex.justify-between.pt-4
          span.font-display.font-bold Total
          span.font-display.font-bold.text-2xl ${{ totalAmount.toFixed(2) }}
      form.space-y-6(class="lg:col-span-5" @submit.prevent="handlePayment")
        h2.font-display.font-bold.uppercase.tracking-tight.text-xl Payment
        CustomInput(v-model="payment.name" label="Name on card" placeholder="Cardholder name")
        CustomInput(v-model="payment.cardNumber" label="Card number" placeholder="4242 4242 4242 4242")
        .grid.grid-cols-2.gap-4
          CustomInput(v-model="payment.expiry" label="Expiry" placeholder="MM/YY")
          CustomInput(v-model="payment.cvc" label="CVC" placeholder="123")
        Magnetic(tag="div")
          button.w-full.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.py-4(
            type="submit"
            data-cursor="hover"
          ) Pay ${{ totalAmount.toFixed(2) }}
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();
const router = useRouter();
const cart = computed(() => cartStore.basket);
const totalAmount = computed(() => cartStore.totalAmount());

const payment = ref({
  name: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
});

const handlePayment = () => {
  if (
    payment.value.name &&
    payment.value.cardNumber &&
    payment.value.expiry &&
    payment.value.cvc
  ) {
    cartStore.basket = [];
    toast.success("Payment successful");
    router.push("/cart/thank-you");
  } else {
    toast.error("Please fill in all payment details.");
  }
};
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
