<template lang="pug">
    .bg-white.p-2(class="w-[12rem] ")
      img.w-full.object-contain(class="h-30 md:h-40" :src="product.image" alt="Card image cap")
      .card-body.space-y-2
        h4.text-black.font-semibold.text-xl ${{product.price}}
        p.text-sm {{product.title}}
</template>

<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>
