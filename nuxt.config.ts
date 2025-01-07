// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    ["@nuxtjs/google-fonts", { families: { Montserrat: true } }],
  ],
  plugins: ["~/plugins/toast.js"],
});
