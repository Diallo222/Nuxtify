<script setup lang="ts"></script>

<template lang="pug">
    .w-screen.h-screen.overflow-y-scroll.px-2.pb-4.bg-white(class="md:px-16 lg:px-44")
        NavBar
        NuxtPage
</template>

<style>
body {
  font-family: "Rubik", serif;
}

::-webkit-scrollbar {
  display: none;
}
</style>
