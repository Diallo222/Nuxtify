<template lang="pug">
    .flex.text-center.border-2.border-black.group(class="hover:cursor-pointer transition" @click="handleclick(category)")
        .flex.flex-col.h-full.justify-between.items-start
            //- p.text-black.text-xs.pl-2 {{ category }}
            p.text-black.uppercase.font-semibold.pl-2 {{ category }}
            button.text-black.text-xs.transition.duration-1000.uppercase.pl-2(class="md:text-lg group-hover:bg-black group-hover:text-white group-hover:p-1") Shop Now
        NuxtImg.object-contain.w-48.h-48(class="group-hover:scale-110 transition duration-1000" :src="`/images/${category.toLowerCase()}.png`" :alt="category")
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
