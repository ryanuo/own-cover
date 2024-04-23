// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  tailwindcss: {
    exposeConfig: true,
    config: {
      plugins: [require("tailwind-scrollbar")],
      theme: {
        extend: {
          colors: {
            bl: {
              50: "#fafafa",
              100: "#f5f5f5",
              200: "#eeeeee",
              300: "#e0e0e0",
              400: "#bdbdbd",
              500: "#000",
              600: "#757575",
              700: "#616161",
              800: "#424242",
              900: "#212121",
            },
          },
        },
      },
    },
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "cn",
        name: "Chinese",
        file: "cn.json",
      },
    ],
    langDir: "locales",
    defaultLocale: "cn",
  },
  runtimeConfig: {
    public: {
      unsplashapikey: process.env.NEXT_PUBLIC_UNSPLASHAPIKEY,
      fontapikey: process.env.NEXT_PUBLIC_FONTAPIKEY,
    },
  },
});