<template lang="pug">
    .container.mx-auto.py-12.px-4(class="md:px-8 lg:px-16")
      h1.text-2xl.font-bold.text-gray-800.mb-8(class="md:text-4xl") Manage Users
      .grid.grid-cols-1.gap-8
        .p-4.bg-white.shadow-md.rounded-lg(v-for="user in users" :key="user.id")
          h2.text-lg.font-semibold.text-gray-800 {{ user.name }}
          p.text-gray-600.mt-1 Email: {{ user.email }}
          button.bg-red-600.text-white.font-semibold.py-2.px-4.rounded-lg.mt-4.transition(class="hover:bg-red-700") Remove User
  </template>

<script setup lang="ts">
import { ref } from "vue";

const users = ref([
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
]);
</script>
