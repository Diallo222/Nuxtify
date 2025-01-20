export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/google-fonts",
      { families: { "Barlow Condensed": ["400", "500", "600", "700", "800"] } },
    ],
    "@nuxt/image",
    "@nuxt/icon",
  ],
  plugins: ["~/plugins/vue-toastification.js"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  runtimeConfig: {
    public: {
      apiUrl: "https://fakestoreapi.com/",
    },
  },
});
