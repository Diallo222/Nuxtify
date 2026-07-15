import { defineStore } from "pinia";
interface User {
  id: number;
  email: string;
  username: string;
  name: object;
  address: object;
  token: string;
  phone: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as User | null,
    loading: false,
  }),
  actions: {
    async login(userName: string, password: string) {
      this.loading = true;
      try {
        const data = await useApi("/auth/login", {
          method: "POST",
          body: {
            username: userName,
            password: password,
          },
        });
        this.user = data;
        useCookie("authToken", {
          sameSite: "strict",
          secure: true,
          maxAge: 60 * 60 * 24,
        }).value = data.token;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
