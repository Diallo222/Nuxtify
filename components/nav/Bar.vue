<template lang="pug">
    nav.flex.flex-col.w-full.justify-between.items-center.sticky.top-0.z-50.bg-white.px-4.py-2.gap-2
        .flex.w-full.justify-between.border-b-2.border-black.py-2
            .flex.flex-row.gap-4
                button.text-black.transition(class="hover:scale-110")
                    Icon(name="mdi:facebook")
                button.text-black.transition(class="hover:scale-110")
                    Icon(name="mdi:twitter")
                button.text-black.transition(class="hover:scale-110")
                    Icon(name="mdi:youtube")
            NuxtLink.flex.items-center.font-extrabold(to="/")
                Icon(name="mdi:shopping" size="1.5em")
                p.text-black.uppercase.text-sm(class="md:text-xl") Nuxtify
            .flex.flex-row.gap-4
                NuxtLink.text-black.transition(class="hover:scale-110" to="/login")
                    Icon(name="mdi:account-box")
                NuxtLink.text-black.transition(class="hover:scale-110" to="/favorites")
                    Icon(name="mdi:bookmark-multiple")
                NuxtLink.text-black.transition(class="hover:scale-110" to="/cart")
                    Icon(name="mdi:cart")
        .flex.gap-4.uppercase.text-black.text-lg
            NuxtLink.font-medium(to="/") Home
            //- NuxtLink.font-medium(to="/categories") Categories
            NuxtLink.font-medium(to="/about") About
            NuxtLink.font-medium(to="/blog") blog
            NuxtLink.font-medium(to="/contact") Contact
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../../store/auth";
const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
