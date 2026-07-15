<template lang="pug">
  div
    AdminPageHeader(
      eyebrow="Catalog"
      title="Products"
      :subtitle="`${filtered.length} shown · ${rows.length} total`"
    )
      template(#actions)
        button.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.px-5.py-3.text-sm(
          type="button"
          data-cursor="hover"
          @click="openCreate"
        ) Add product

    AdminToolbar(
      v-model:search="search"
      v-model:filter="category"
      :filters="categoryOptions"
      search-placeholder="Search title or category…"
      filter-label="Category"
      all-label="All categories"
    )

    CustomLoader(:loading="loading && !rows.length")

    AdminDataTable(
      v-if="!loading || rows.length"
      :columns="columns"
      :empty="!filtered.length"
      empty-title="No products"
      empty-subtitle="Try another search or category."
    )
      .flex.flex-wrap.items-center.justify-between.gap-4.px-4.py-4(
        v-for="product in filtered"
        :key="product.id"
        class="md:flex-nowrap"
      )
        .flex.items-center.gap-4.min-w-0.flex-1
          NuxtImg.w-12.h-12.object-contain.bg-ink-muted.p-1.shrink-0(
            :src="product.image"
            :alt="product.title"
          )
          .min-w-0
            p.font-display.font-bold.truncate {{ product.title }}
            p.text-ash.text-xs.uppercase.tracking-widest(class="md:hidden") {{ product.category }} · ${{ Number(product.price).toFixed(2) }}
        p.text-ash.text-xs.uppercase.tracking-widest.hidden.shrink-0(class="md:block w-36") {{ product.category }}
        p.font-display.font-bold.hidden.shrink-0(class="md:block w-20 text-right") ${{ Number(product.price).toFixed(2) }}
        .flex.gap-2.shrink-0
          button.border.border-white-20.px-3.py-2.text-xs.uppercase.tracking-widest.transition(
            type="button"
            class="hover:border-accent hover:text-accent"
            data-cursor="hover"
            @click="openEdit(product)"
          ) Edit
          button.border.border-white-20.px-3.py-2.text-xs.uppercase.tracking-widest.text-red-400.transition(
            type="button"
            class="hover:border-red-400"
            data-cursor="hover"
            @click="removeProduct(product.id)"
          ) Delete

    Teleport(to="body")
      .fixed.inset-0(class="z-[90]" v-if="panelOpen")
        .absolute.inset-0.bg-ink-80.backdrop-blur-sm(@click="closePanel")
        aside.absolute.top-0.right-0.h-full.w-full.bg-ink-elevated.border-l.border-white-10.flex.flex-col(
          class="md:max-w-md"
        )
          .flex.items-center.justify-between.px-6.py-5.border-b.border-white-10
            h2.font-display.font-bold.uppercase.tracking-tight.text-xl {{ editingId ? 'Edit product' : 'Add product' }}
            button.text-ash.transition-colors(type="button" aria-label="Close" class="hover:text-paper" @click="closePanel")
              Icon(name="mdi:close" size="1.5em")
          form.flex-1.overflow-y-auto.px-6.py-6.space-y-6(@submit.prevent="saveProduct")
            CustomInput(v-model="form.title" label="Title" placeholder="Product title" :error="formError.title")
            CustomInput(v-model="form.price" label="Price" type="number" placeholder="29.99" :error="formError.price")
            CustomInput(v-model="form.category" label="Category" placeholder="electronics" :error="formError.category")
            CustomInput(v-model="form.image" label="Image URL" placeholder="https://…" )
            p.text-ash.text-xs Demo only — changes stay in this session.
            button.w-full.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.py-4(
              type="submit"
              data-cursor="hover"
            ) {{ editingId ? 'Save changes' : 'Create product' }}
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { useProductsStore } from "~/stores/products";
import type Product from "~/stores/types";

definePageMeta({ layout: "admin" });

const productStore = useProductsStore();
const loading = computed(() => productStore.loading);

const demoExtras = ref<Product[]>([]);
const removedIds = ref<number[]>([]);

const rows = computed(() => {
  const base = productStore.allProducts.filter(
    (p) => !removedIds.value.includes(p.id)
  );
  return [...demoExtras.value, ...base];
});

const search = ref("");
const category = ref("");

const categoryOptions = computed(() => {
  const set = new Set(rows.value.map((p) => p.category));
  return Array.from(set)
    .sort()
    .map((c) => ({ label: c, value: c }));
});

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return rows.value.filter((p) => {
    const matchCat = !category.value || p.category === category.value;
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
});

const columns = [
  { key: "product", label: "Product", class: "flex-[2]" },
  { key: "category", label: "Category", class: "w-36" },
  { key: "price", label: "Price", class: "w-20 text-right" },
  { key: "actions", label: "Actions", class: "w-36 text-right" },
];

const panelOpen = ref(false);
const editingId = ref<number | null>(null);
const form = ref({
  title: "",
  price: "",
  category: "",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
});
const formError = ref({ title: "", price: "", category: "" });

const openCreate = () => {
  editingId.value = null;
  form.value = {
    title: "",
    price: "",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  };
  formError.value = { title: "", price: "", category: "" };
  panelOpen.value = true;
};

const openEdit = (product: Product) => {
  editingId.value = product.id;
  form.value = {
    title: product.title,
    price: String(product.price),
    category: product.category,
    image: product.image,
  };
  formError.value = { title: "", price: "", category: "" };
  panelOpen.value = true;
};

const closePanel = () => {
  panelOpen.value = false;
};

const saveProduct = () => {
  formError.value = { title: "", price: "", category: "" };
  let ok = true;
  if (!form.value.title.trim()) {
    formError.value.title = "Title is required";
    ok = false;
  }
  const price = Number(form.value.price);
  if (!form.value.price || Number.isNaN(price) || price < 0) {
    formError.value.price = "Enter a valid price";
    ok = false;
  }
  if (!form.value.category.trim()) {
    formError.value.category = "Category is required";
    ok = false;
  }
  if (!ok) return;

  if (editingId.value != null) {
    const idx = demoExtras.value.findIndex((p) => p.id === editingId.value);
    const patch = {
      title: form.value.title.trim(),
      price,
      category: form.value.category.trim(),
      image: form.value.image.trim() || form.value.image,
    };
    if (idx >= 0) {
      demoExtras.value[idx] = { ...demoExtras.value[idx], ...patch };
    } else {
      // Edited Fake Store item → move into demoExtras override by removing original id and adding copy
      const original = productStore.allProducts.find(
        (p) => p.id === editingId.value
      );
      if (original) {
        removedIds.value.push(original.id);
        demoExtras.value.unshift({
          ...original,
          ...patch,
          id: original.id,
          description: original.description || "Demo edited product",
        });
      }
    }
    toast.success("Product updated (demo)");
  } else {
    const id = Date.now();
    demoExtras.value.unshift({
      id,
      title: form.value.title.trim(),
      price,
      category: form.value.category.trim(),
      image: form.value.image.trim(),
      description: "Demo product staged in admin.",
    });
    toast.success("Product created (demo)");
  }
  closePanel();
};

const removeProduct = (id: number) => {
  const extraIdx = demoExtras.value.findIndex((p) => p.id === id);
  if (extraIdx >= 0) {
    demoExtras.value.splice(extraIdx, 1);
  } else {
    removedIds.value.push(id);
  }
  toast.message("Product removed (demo)");
};

onMounted(() => {
  if (!productStore.products.length) productStore.fetchProducts();
  if (!productStore.categories.length) productStore.fetchCategories();
});
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
.bg-ink-80 {
  background-color: color-mix(in srgb, var(--color-ink) 80%, transparent);
}
</style>
