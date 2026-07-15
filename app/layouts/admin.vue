<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>

<template lang="pug">
    .container.mx-auto.py-12.px-4(class="md:px-8 lg:px-16")
        ClientOnly
            Toaster(position="top-center" :duration="5000")
        h1.text-3xl.font-bold.text-gray-800.text-center.mb-8(class="md:text-5xl") Admin Panel
        NuxtPage
        NuxtLink.bg-red-600.block.bg-white.shadow-md.p-6.transition.w-fit(to="/" class="hover:bg-red-700")
            h2.text-xl.font-semibold.text-black Return to Store
</template>
