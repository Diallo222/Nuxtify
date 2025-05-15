<template lang="pug">
    .flex.text-center.border-2.border-black.shadow-md.overflow-hidden.group(
      class="hover:cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      @click="handleclick(category)"
    )
        .flex.flex-col.h-full.justify-between.items-start.p-3(class="md:p-4")
            //- p.text-black.text-xs.pl-2 {{ category }}
            p.text-black.uppercase.font-bold.pl-1(class="md:text-lg") {{ category }}
            button.text-black.text-sm.transition.duration-500.uppercase.px-2.py-1.mt-2.border.border-black(
              class="md:text-base group-hover:bg-black group-hover:text-white"
            ) Shop Now
        NuxtImg.object-contain.w-48.h-48.p-2(
          class="group-hover:scale-105 transition duration-500" 
          :src="`/images/${category.toLowerCase()}.png`" 
          :alt="category"
        )
</template>

<script setup lang="ts">
import { useProductsStore } from "~/store/products";
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});
const router = useRouter();
const productStore = useProductsStore();
const handleclick = (category: string) => {
  productStore.fetchCategoryProducts(category);
  router.push(`/categories/${category}`);
};
</script>
