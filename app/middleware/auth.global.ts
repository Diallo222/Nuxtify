import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) return;

  if (to.path.startsWith("/admin") || to.path.startsWith("/cart/checkout")) {
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
});
