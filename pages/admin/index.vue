<template lang="pug">
    .container.mx-auto.py-12.px-4(class="md:px-8 lg:px-16")
      h1.text-3xl.font-bold.text-gray-800.text-center.mb-8(class="md:text-5xl") Admin Panel
  
      .grid.grid-cols-1.gap-8(class="md:grid-cols-2 lg:grid-cols-3")
        nuxt-link.block.bg-white.shadow-md.p-6.transition(to="/admin/products" class="hover:bg-gray-100")
          h2.text-xl.font-semibold.text-gray-800 Manage Products
          p.text-gray-600.mt-2 View, add, edit, or delete products.
  
        nuxt-link.block.bg-white.shadow-md.p-6.transition(to="/admin/orders" class="hover:bg-gray-100")
          h2.text-xl.font-semibold.text-gray-800 Manage Orders
          p.text-gray-600.mt-2 View and process customer orders.
  
        nuxt-link.block.bg-white.shadow-md.p-6.transition(to="/admin/users" class="hover:bg-gray-100")
          h2.text-xl.font-semibold.text-gray-800 Manage Users
          p.text-gray-600.mt-2 View, add, or remove users.
  
        nuxt-link.bg-red-600.block.bg-white.shadow-md.p-6.transition(to="/" class="hover:bg-red-700")
          h2.text-xl.font-semibold.text-black Return to Store
  </template>

<script setup></script>
