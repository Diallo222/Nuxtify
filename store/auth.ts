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
        const response = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to login.");
        }

        const data = await response.json();
        this.user = data;
        document.cookie = `token=${data.token}`;
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
