<template lang="pug">
    .bg-white.p-2(class="w-[12rem]")
      img.w-full.object-contain.h-30(class="md:h-40" :src="product.image" alt="Card image cap")
      .mt-2
        p.text-xs.font-semibold.text-gray-600.uppercase {{product.category}}
        .mt-1
          p.text-sm.font-semibold.truncate {{product.title}}
          .flex.items-center.justify-between.space-y-1
            p.text-sm.font-semibold.text-green-600 ${{product.price}}
            p.text-xs.font-semibold.text-gray-600
              | {{product.rating.rate}} <span>| {{product.rating.count}}</span>
  </template>

<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>
