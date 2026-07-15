<template lang="pug">
  div
    AdminPageHeader(
      eyebrow="Fulfillment"
      title="Orders"
      :subtitle="`${filtered.length} of ${orders.length} demo orders`"
    )

    AdminToolbar(
      v-model:search="search"
      v-model:filter="status"
      :filters="statusOptions"
      search-placeholder="Search id or customer…"
      filter-label="Status"
      all-label="All statuses"
    )

    AdminDataTable(
      :columns="columns"
      :empty="!filtered.length"
      empty-title="No orders"
      empty-subtitle="No demo orders match this filter."
    )
      .flex.flex-wrap.items-center.justify-between.gap-4.px-4.py-5(
        v-for="order in filtered"
        :key="order.id"
      )
        .min-w-0.flex-1
          p.font-display.font-bold {{ order.id }}
          p.text-ash.text-sm {{ order.customer }} · {{ order.items }} items · {{ order.date }}
        .flex.flex-wrap.items-center.gap-3
          AdminStatusBadge(:label="order.status" :tone="toneFor(order.status)")
          span.font-display.font-bold ${{ order.total.toFixed(2) }}
          button.border.border-white-20.px-3.py-2.text-xs.uppercase.tracking-widest.transition(
            v-if="order.status === 'Processing'"
            type="button"
            class="hover:border-accent hover:text-accent"
            data-cursor="hover"
            @click="markShipped(order.id)"
          ) Mark shipped
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

definePageMeta({ layout: "admin" });

type OrderStatus = "Processing" | "Shipped" | "Cancelled";

type DemoOrder = {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: OrderStatus;
  date: string;
};

const orders = ref<DemoOrder[]>([
  { id: "ORD-1042", customer: "A. Mercer", items: 3, total: 248.5, status: "Processing", date: "Jul 14" },
  { id: "ORD-1041", customer: "J. Cole", items: 1, total: 89.0, status: "Shipped", date: "Jul 13" },
  { id: "ORD-1040", customer: "R. Vale", items: 2, total: 156.2, status: "Shipped", date: "Jul 12" },
  { id: "ORD-1039", customer: "S. Park", items: 4, total: 312.8, status: "Processing", date: "Jul 11" },
  { id: "ORD-1038", customer: "M. Quinn", items: 1, total: 54.0, status: "Cancelled", date: "Jul 10" },
  { id: "ORD-1037", customer: "L. Chen", items: 2, total: 120.4, status: "Shipped", date: "Jul 9" },
  { id: "ORD-1036", customer: "K. Ortiz", items: 5, total: 401.1, status: "Processing", date: "Jul 8" },
  { id: "ORD-1035", customer: "T. Brooks", items: 1, total: 67.9, status: "Shipped", date: "Jul 7" },
]);

const search = ref("");
const status = ref("");

const statusOptions = [
  { label: "Processing", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Cancelled", value: "Cancelled" },
];

const columns = [
  { key: "order", label: "Order", class: "flex-1" },
  { key: "status", label: "Status", class: "w-28" },
  { key: "total", label: "Total", class: "w-24" },
  { key: "actions", label: "", class: "w-32" },
];

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return orders.value.filter((o) => {
    const matchStatus = !status.value || o.status === status.value;
    const matchQ =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q);
    return matchStatus && matchQ;
  });
});

const toneFor = (s: OrderStatus) => {
  if (s === "Shipped") return "accent" as const;
  if (s === "Cancelled") return "danger" as const;
  return "warn" as const;
};

const markShipped = (id: string) => {
  const order = orders.value.find((o) => o.id === id);
  if (!order) return;
  order.status = "Shipped";
  toast.success(`${id} marked shipped (demo)`);
};
</script>

<style scoped>
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
