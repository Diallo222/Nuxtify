<template lang="pug">  
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
  
       
  </template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>
