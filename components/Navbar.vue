<template lang="pug">
    nav.flex.w-full.justify-between.items-center.sticky.top-0.z-50.bg-white.py-2.px-4.rounded-3xl
        NuxtLink.flex.items-center.gap-2(to="/")
            img(src="/public/favicon.ico" style="width: 40px;object-fit: contain;")
            p.text-black.font-semibold Nuxtify
        .flex.gap-4
            NuxtLink.nav-link.text-black(to="/login" v-if="!user") login
            NuxtLink.nav-link.text-black(to="/about") About
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
