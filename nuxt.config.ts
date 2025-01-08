export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    ["@nuxtjs/google-fonts", { families: { Montserrat: true } }],
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  runtimeConfig: {
    public: {
      apiUrl: "https://fakestoreapi.com/",
    },
  },
});
