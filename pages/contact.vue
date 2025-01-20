<template lang="pug">
    .container.mx-auto.py-12.px-4(class="md:px-8 lg:px-16")
      .text-center.mb-8
        h1.text-3xl.font-bold.text-gray-800.uppercase(class="md:text-5xl") Contact Us
        p.text-lg.text-gray-600.mt-4(class="md:text-xl")
          | Have questions or feedback? We'd love to hear from you!
  
      form.bg-white.shadow-md.p-6.space-y-6.max-w-2xl.mx-auto(@submit.prevent="handleSubmit")
        .space-y-4
          label.block.text-sm.font-medium.text-gray-700(for="name") Name
          input#name.border.border-gray-300.w-full.p-3(class="focus:outline-none focus:ring-2 focus:ring-black" placeholder="Your Name" v-model="form.name")
  
          label.block.text-sm.font-medium.text-gray-700(for="email") Email
          input#email.type-email.border.border-gray-300.w-full.p-3(class="focus:outline-none focus:ring-2 focus:ring-black"  placeholder="Your Email" v-model="form.email")
  
          label.block.text-sm.font-medium.text-gray-700(for="message") Message
          textarea#message.border.border-gray-300.w-full.p-3(class="focus:outline-none focus:ring-2 focus:ring-black" placeholder="Your Message" v-model="form.message")
  
        button.bg-zinc-900.text-white.font-semibold.py-2.px-4.w-full.transition(type="submit") Send Message
  </template>

<script setup lang="ts">
import { useToast } from "vue-toastification";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const handleSubmit = () => {
  if (form.value.name && form.value.email && form.value.message) {
    useToast().success("Thank you for contacting us!");
    form.value = { name: "", email: "", message: "" };
  } else {
    useToast().error("Please fill in all fields.");
  }
};
</script>
