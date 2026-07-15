<template lang="pug">
  .px-5.py-16(class="md:px-10 lg:px-16")
    .grid.gap-16(class="lg:grid-cols-12")
      .space-y-4(class="lg:col-span-5")
        p.text-accent.text-xs.uppercase(class="tracking-[0.3em]") Contact
        h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl(
          class="md:text-7xl"
        ) Say hello
        p.text-ash.max-w-sm Questions, collaborations, or casting calls for the next drop.
      form.space-y-8(class="lg:col-span-7" @submit.prevent="handleSubmit")
        CustomInput(v-model="form.name" label="Name" placeholder="Your name")
        CustomInput(v-model="form.email" label="Email" type="email" placeholder="you@studio.com")
        label.block.space-y-2
          span.text-xs.uppercase.tracking-widest.text-ash Message
          textarea.w-full.bg-transparent.border-b.border-white-20.px-0.py-3.text-paper.placeholder-ash.min-h-32.transition(
            class="focus:outline-none focus:border-accent"
            v-model="form.message"
            placeholder="Your message"
          )
        Magnetic(tag="div")
          button.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.px-8.py-4(
            type="submit"
            data-cursor="hover"
          ) Send message
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

const form = ref({ name: "", email: "", message: "" });

const handleSubmit = () => {
  if (form.value.name && form.value.email && form.value.message) {
    toast.success("Thank you for contacting us!");
    form.value = { name: "", email: "", message: "" };
  } else {
    toast.error("Please fill in all fields.");
  }
};
</script>

<style scoped>
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
