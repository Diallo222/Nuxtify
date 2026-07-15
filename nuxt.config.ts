import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["gsap", "gsap/ScrollTrigger", "lenis", "vue-sonner"],
    },
  },
  modules: [
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Syne: [600, 700, 800],
          "DM Sans": [400, 500, 600, 700],
        },
        display: "swap",
      },
    ],
    "@nuxt/image",
    "@nuxt/icon",
  ],
  image: {
    domains: ["fakestoreapi.com", "images.unsplash.com"],
  },
  app: {
    pageTransition: { name: "page-wipe", mode: "out-in" },
    head: {
      htmlAttrs: { lang: "en" },
      title: "Nuxtify — Concept Store",
      meta: [
        {
          name: "description",
          content:
            "Nuxtify kinetic concept store — fashion, jewelry, and electronics reimagined.",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: "https://fakestoreapi.com/",
    },
  },
});
