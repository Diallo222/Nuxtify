<template lang="pug">
    .container.mx-auto.py-12.px-4(class="md:px-8 lg:px-16")
      .text-center.mb-8
        h1.text-3xl.font-bold.text-gray-800.uppercase(class="md:text-5xl") About Nuxtify
        p.text-lg.text-gray-600.mt-4(class="md:text-xl") 
          | Your one-stop shop for high-quality products delivered with excellence.
  
      .grid.grid-cols-1.gap-8(class="md:grid-cols-2 lg:grid-cols-3")
        .bg-white.shadow-md.p-6.flex.flex-col.items-center
          Icon(name="mdi:shopping-outline" class="text-4xl text-black")
          h2.text-xl.font-semibold.text-gray-700.mt-4 Our Mission
          p.text-gray-600.mt-2.text-center 
            | At Nuxtify, our mission is to provide a seamless shopping experience 
            | with a curated selection of products tailored to your needs.
  
        .bg-white.shadow-md.p-6.flex.flex-col.items-center
          Icon(name="mdi:truck-delivery-outline" class="text-4xl text-black")
          h2.text-xl.font-semibold.text-gray-700.mt-4 Fast Delivery
          p.text-gray-600.mt-2.text-center 
            | Enjoy fast, reliable delivery services to your doorstep, no matter where you are.
  
        .bg-white.shadow-md.p-6.flex.flex-col.items-center
          Icon(name="mdi:account-group-outline" class="text-4xl text-black")
          h2.text-xl.font-semibold.text-gray-700.mt-4 Customer Support
          p.text-gray-600.mt-2.text-center 
            | Our team is here to assist you 24/7 with any inquiries or support you may need.
  </template>

<script setup lang="ts"></script>
