<template lang="pug">
  .px-5.py-16.flex.items-center.justify-center(class="min-h-[70vh] md:px-10")
    .w-full.max-w-md.space-y-10
      div
        p.text-accent.text-xs.uppercase(class="tracking-[0.3em]") Account
        h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.mt-3 Register
        p.text-ash.mt-3.text-sm Create a demo profile. Fake Store has no real signup — this stays local UX.
      form.space-y-8(@submit.prevent="submit")
        CustomInput(v-model="form.username" label="Username" placeholder="yourname")
        CustomInput(v-model="form.email" label="Email" type="email" placeholder="you@studio.com")
        CustomInput(v-model="form.password" label="Password" type="password" placeholder="••••••••")
        Magnetic(tag="div")
          button.w-full.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.py-4(
            type="submit"
            data-cursor="hover"
          ) Create account
      p.text-ash.text-sm
        | Already in?
        |
        NuxtLink.text-paper.underline.underline-offset-4(to="/login" class="hover:text-accent") Login
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

const form = ref({
  username: "",
  email: "",
  password: "",
});

const submit = () => {
  if (!form.value.username || !form.value.email || !form.value.password) {
    toast.error("Please fill in all fields.");
    return;
  }
  toast.success("Account created (demo). Please log in with Fake Store credentials.");
  navigateTo("/login");
};
</script>
