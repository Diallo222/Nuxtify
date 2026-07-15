<template lang="pug">
  div
    AdminPageHeader(
      eyebrow="Access"
      title="Users"
      :subtitle="`${filtered.length} of ${users.length} demo accounts`"
    )

    AdminToolbar(
      v-model:search="search"
      v-model:filter="role"
      :filters="roleOptions"
      search-placeholder="Search name or email…"
      filter-label="Role"
      all-label="All roles"
    )

    AdminDataTable(
      :columns="columns"
      :empty="!filtered.length"
      empty-title="No users"
      empty-subtitle="No demo accounts match this search."
    )
      .flex.flex-wrap.items-center.justify-between.gap-4.px-4.py-5(
        v-for="user in filtered"
        :key="user.id"
      )
        .min-w-0.flex-1
          p.font-display.font-bold {{ user.name }}
          p.text-ash.text-sm {{ user.email }} · joined {{ user.joined }}
        .flex.flex-wrap.items-center.gap-3
          AdminStatusBadge(
            :label="user.role"
            :tone="user.role === 'Admin' ? 'accent' : 'ash'"
          )
          button.border.border-white-20.px-3.py-2.text-xs.uppercase.tracking-widest.text-red-400.transition(
            type="button"
            class="hover:border-red-400"
            data-cursor="hover"
            @click="removeUser(user.id)"
          ) Remove
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

definePageMeta({ layout: "admin" });

type DemoUser = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Customer";
  joined: string;
};

const users = ref<DemoUser[]>([
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", joined: "Jan 2025" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Customer", joined: "Mar 2025" },
  { id: 3, name: "John Doe", email: "johnd@example.com", role: "Customer", joined: "Apr 2025" },
  { id: 4, name: "Maya Ortiz", email: "maya@example.com", role: "Customer", joined: "Jun 2025" },
  { id: 5, name: "Sam Rivera", email: "sam@example.com", role: "Admin", joined: "Aug 2025" },
]);

const search = ref("");
const role = ref("");

const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Customer", value: "Customer" },
];

const columns = [
  { key: "user", label: "User", class: "flex-1" },
  { key: "role", label: "Role", class: "w-28" },
  { key: "actions", label: "", class: "w-24" },
];

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return users.value.filter((u) => {
    const matchRole = !role.value || u.role === role.value;
    const matchQ =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q);
    return matchRole && matchQ;
  });
});

const removeUser = (id: number) => {
  users.value = users.value.filter((u) => u.id !== id);
  toast.message("User removed (demo)");
};
</script>

<style scoped>
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
