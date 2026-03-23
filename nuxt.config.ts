// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['@/assets/css/main.css'],

  ssr: true,
  nitro: {
    static: true
  },

  future: {
    compatibilityVersion: 4
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ui: {
    // Nuxt UI 3 options
  },

  colorMode: {
    classSuffix: '-mode',
    preference: 'dark',
    fallback: 'dark'
  },

  app: {
    head: {
      title: 'BentoBoxDS | Gaia Intelligences Shape Health',
      meta: [
        { name: 'description', content: 'Gaia intelligences shape health.' }
      ],
      script: [
        { src: '/js/heli-clock.js' }
      ]
    }
  }
})
