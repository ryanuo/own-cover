const {
  scrollbarGutter,
  scrollbarWidth,
  scrollbarColor,
} = require("tailwind-scrollbar-utilities");
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/ui", "@nuxtjs/i18n"],
  tailwindcss: {
    exposeConfig: true,
    config: {
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
      plugins: [scrollbarWidth()],
    },
  },
});
