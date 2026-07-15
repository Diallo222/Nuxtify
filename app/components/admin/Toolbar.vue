<template lang="pug">
  .flex.flex-col.gap-3.mb-6(class="sm:flex-row sm:items-end")
    .flex-1.min-w-0
      CustomInput(
        v-model="searchProxy"
        :label="searchLabel"
        :placeholder="searchPlaceholder"
      )
    label.block.space-y-2.shrink-0(v-if="filters?.length" class="sm:w-48")
      span.text-xs.uppercase.tracking-widest.text-ash {{ filterLabel }}
      select.w-full.bg-transparent.border-b.border-white-20.px-0.py-3.text-paper.transition(
        class="focus:outline-none focus:border-accent"
        :value="filter"
        @change="onFilter"
      )
        option.text-ink(value="") {{ allLabel }}
        option.text-ink(v-for="opt in filters" :key="opt.value" :value="opt.value") {{ opt.label }}
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    search: string;
    filter?: string;
    filters?: Array<{ label: string; value: string }>;
    searchLabel?: string;
    searchPlaceholder?: string;
    filterLabel?: string;
    allLabel?: string;
  }>(),
  {
    searchLabel: "Search",
    searchPlaceholder: "Search…",
    filterLabel: "Filter",
    allLabel: "All",
    filter: "",
  }
);

const emit = defineEmits<{
  "update:search": [string];
  "update:filter": [string];
}>();

const searchProxy = computed({
  get: () => props.search,
  set: (v: string) => emit("update:search", v),
});

const onFilter = (e: Event) => {
  emit("update:filter", (e.target as HTMLSelectElement).value);
};
</script>

<style scoped>
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
