import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      { families: { "Barlow Condensed": ["400", "500", "600", "700", "800"] } },
    ],
    "@nuxt/image",
    "@nuxt/icon",
  ],
  runtimeConfig: {
    public: {
      apiUrl: "https://fakestoreapi.com/",
    },
  },
});
