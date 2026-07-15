<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>

<template lang="pug">
  .min-h-screen.bg-ink.text-paper
    ClientOnly
      CustomPreloader
      AppCursor
      Toaster(position="top-center" :duration="4000" theme="dark")
    NavBar
    CartDrawer
    main.pt-20
      slot
    SiteFooter
</template>
