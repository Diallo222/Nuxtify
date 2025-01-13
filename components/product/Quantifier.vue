<template lang="pug">
    p.text-lg.uppercase.font-semibold Quantity
    .flex.flex-row.justify-between.items-center.px-4.border.border-black(class="md:px-6")
        button.p-2.transition(class="hover:scale-110" @click="$emit('decrement')")
            Icon(name="mdi:minus")
        p.text-base.font-semibold {{quantity}}
        button.p-2.transition(class="hover:scale-110" @click="$emit('increment')")
            Icon(name="mdi:plus")

</template>

<script setup lang="ts">
const props = defineProps({
  quantity: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["increment", "decrement"]);
</script>
