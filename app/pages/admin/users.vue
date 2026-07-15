<template lang="pug">
  div
    h1.font-display.font-extrabold.uppercase.tracking-tighter.text-4xl.mb-2 Users
    p.text-ash.text-sm.mb-10 Demo accounts for the control room.
    .border.border-white-10.divide-y.divide-white-10
      .flex.flex-wrap.items-center.justify-between.gap-4.px-4.py-5(
        v-for="user in users"
        :key="user.id"
      )
        div
          p.font-display.font-bold {{ user.name }}
          p.text-ash.text-sm {{ user.email }}
        button.border.border-white-20.px-3.py-2.text-xs.uppercase.tracking-widest.text-red-400.transition(
          type="button"
          class="hover:border-red-400"
          data-cursor="hover"
          @click="toast.message('Demo remove')"
        ) Remove
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

definePageMeta({ layout: "admin" });

const users = ref([
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "John Doe", email: "johnd@example.com" },
]);
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
.divide-white-10 > :not([hidden]) ~ :not([hidden]) {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
