// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],

  googleFonts: {
    download: true,

    families: {
      Ubuntu: {
        wght: [300, 400, 500, 700],
      },
      'Source+Sans+3': {
        wght: [300, 400, 500, 600],
      },
    },
  },
  runtimeConfig: {
    // Will be available only on the server-side
    apiBaseUrl: '',
    apiToken: '',
  },
});
