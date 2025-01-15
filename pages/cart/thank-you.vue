<template lang="pug">
    .container.mx-auto.py-12.px-4(class="md:px-8 lg:px-16 text-center")
      .text-center.mb-8
        h1.text-3xl.font-bold.text-gray-800(class="md:text-5xl") Thank You for Your Purchase!
        p.text-lg.text-gray-600.mt-4(class="md:text-xl")
          | We appreciate your trust in us. Your order has been successfully placed.
      .mt-8
        Icon(name="mdi:party-popper" class="text-8xl text-black")
      .mt-8
        p.text-base.text-gray-700
          | You will receive a confirmation email shortly with the details of your order.
      .mt-12
        nuxt-link(to="/")
          button.bg-zinc-900.text-white.font-semibold.py-2.px-4.rounded-lg.transition Return to Home
  </template>

<script setup></script>
