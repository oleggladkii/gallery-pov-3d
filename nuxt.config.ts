// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@nuxt/eslint'],

  eslint: {
      config: {
          stylistic: true,
      },
  },

  runtimeConfig: {
      public: {
          API_BASE_URL: process.env.API_BASE_URL,
          BASE_URL: process.env.BASE_URL,
      }
  },

  compatibilityDate: '2024-10-20'
})
