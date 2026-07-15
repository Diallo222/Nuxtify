import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (
    !authStore.isAuthenticated &&
    (to.path.startsWith("/admin") || to.path.startsWith("/cart/checkout"))
  ) {
    return navigateTo("/login");
  }
});
