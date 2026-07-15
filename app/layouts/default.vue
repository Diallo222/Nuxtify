<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>

<template lang="pug">
    .w-screen.h-screen.overflow-y-scroll.px-2.pb-4.bg-white(class="md:px-16 lg:px-44")
        ClientOnly
            Toaster(position="top-center" :duration="5000")
        NavBar
        NuxtPage
</template>

<style>
body {
  font-family: "Barlow Condensed", serif;
}

::-webkit-scrollbar {
  display: none;
}
</style>
