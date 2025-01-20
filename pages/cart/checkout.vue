<template lang="pug">
    .container.mx-auto.pb-12.px-4(class="md:px-8 lg:px-16")
      .text-center.mb-8
        h1.text-3xl.font-bold.text-gray-800.uppercase(class="md:text-5xl") Checkout
        p.text-lg.text-gray-600.mt-4(class="md:text-xl") Complete your purchase below.
  
      .grid.grid-cols-1.gap-8(class="md:grid-cols-3")
        // Product Summary
        .bg-white.shadow-md.p-6.space-y-6(class="md:col-span-2")
          h2.text-xl.font-semibold.text-gray-800 Order Summary
          ul
            li.border-b.py-4.flex.justify-between.items-center(v-for="item in cart" :key="item.id")
              .text-gray-700
                p.font-medium {{ item.title }}
                p.text-sm.text-gray-500 Quantity: {{ item.quantity }}
              p.font-semibold.text-gray-800 ${{ (item.price * item.quantity).toFixed(2) }}
  
          .flex.justify-between.items-center.mt-4
            p.text-lg.font-semibold.text-gray-800 Total:
            p.text-lg.font-semibold.text-zinc-900 ${{ totalAmount.toFixed(2) }}
  
        // Payment Form
        .bg-white.shadow-md.px-6.py-4.space-y-6
          h2.text-xl.font-semibold.text-gray-800 Payment Details
          form(@submit.prevent="handlePayment")
            .space-y-4
              label.block.text-sm.font-medium.text-gray-700(for="name") Name on Card
              input#name.border.border-gray-300.w-full.p-3(class="focus:outline-none focus:ring-2 focus:ring-black" type="text" placeholder="Cardholder Name" v-model="payment.name")
  
              label.block.text-sm.font-medium.text-gray-700(for="card") Card Number
              input#card.border.border-gray-300.w-full.p-3(class="focus:outline-none focus:ring-2 focus:ring-black" type="number" placeholder="1234 5678 9012 3456" v-model="payment.cardNumber")
  
              .grid.grid-cols-2.gap-4
                .space-y-4
                  label.block.text-sm.font-medium.text-gray-700(for="expiry") Expiry Date
                  input#expiry.border.border-gray-300.w-full.p-3( class="focus:outline-none focus:ring-2 focus:ring-black" type="text" placeholder="MM/YY" v-model="payment.expiry")
  
                .space-y-4
                  label.block.text-sm.font-medium.text-gray-700(for="cvc") CVC
                  input#cvc.border.border-gray-300.w-full.p-3(class="focus:outline-none focus:ring-2 focus:ring-black" type="number" placeholder="123" v-model="payment.cvc")
  
            button.bg-zinc-900.text-white.font-semibold.py-2.px-4.w-full.transition.mt-4(type="submit") Pay ${{ totalAmount.toFixed(2) }}
  </template>

<script setup lang="ts">
import { useCartStore } from "~/store/cart";

const cartStore = useCartStore();
const cart = computed(() => cartStore.basket);
const totalAmount = computed(() => cartStore.totalAmount());

const router = useRouter();
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
    router.push("/cart/thank-you");
    alert("Payment Successful! Thank you for your purchase.");

    // Clear the cart after successful payment (Optional)
    cartStore.basket = [];
  } else {
    alert("Please fill in all payment details.");
  }
};
</script>
