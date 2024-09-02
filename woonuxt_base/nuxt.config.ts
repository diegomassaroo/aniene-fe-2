import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: '2024-07-09',
  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    },
    pageTransition: { name: 'page', mode: 'default' },
  },

  experimental: {
    sharedPrerenderData: true,
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: { visibility: false },
      },
    },
  },

  plugins: [resolve('./app/plugins/init.ts')],

  components: [{ path: resolve('./app/components'), pathPrefix: false }],

  modules: ['woonuxt-settings', 'nuxt-font-loader', 'nuxt-graphql-client', '@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/image', '@nuxtjs/i18n', '@dargmuesli/nuxt-cookie-control'],

  'graphql-client': {
    clients: {
      default: {
        host: process.env.GQL_HOST || 'http://localhost:4000/graphql',
        corsOptions: { mode: 'cors', credentials: 'include' },
      },
    },
  },

  alias: {
    '#constants': resolve('./app/constants'),
    '#woo': '../.nuxt/gql/default',
  },

  hooks: {
    'pages:extend'(pages) {
      const addPage = (name: string, path: string, file: string) => {
        pages.push({ name, path, file: resolve(`./app/pages/${file}`) });
      };

      addPage('product-page-pager', '/products/page/:pageNumber', 'products.vue');
      addPage('product-category-page', '/product-category/:categorySlug', 'product-category/[slug].vue');
      addPage('product-category-page-pager', '/product-category/:categorySlug/page/:pageNumber', 'product-category/[slug].vue');
      addPage('order-received', '/checkout/order-received/:orderId', 'order-summary.vue');
      addPage('order-summary', '/order-summary/:orderId', 'order-summary.vue');
    },
  },

  nitro: {
    routeRules: {
      '/': { prerender: true },
      '/products/**': { swr: 3600 },
      '/checkout/order-received/**': { ssr: false },
      '/order-summary/**': { ssr: false },
    },
  },

  // Multilingual support
  i18n: {
    locales: [
      { code: 'en_US', file: 'en-US.json', name: 'English 🇺🇸' },
      { code: 'it_IT', file: 'it-IT.json', name: 'Italiano 🇮🇹' },
    ],
    langDir: 'locales',
    defaultLocale: 'en_US',
    strategy: 'no_prefix',
  },

  fontLoader: {
    autoImport: true,
    local: [
      {
        src: '/fonts/GrotesqueMTStd.woff2',
        family: 'MT Grotesque',
        weight: 'normal',
        display: 'swap',
        style: 'normal',
        fallback: 'sans-serif',
        variable: 'MTG',
      },
      {
        src: '/fonts/GrotesqueMTStd-Italic.woff2',
        family: 'MT Grotesque',
        weight: 'normal',
        display: 'swap',
        style: 'italic',
        fallback: 'sans-serif',
        variable: 'MTGi',
      },
    ],
  },
  cookieControl: {
    barPosition: 'bottom-right',
    closeModalOnClickOutside: false,
    colors: {
      barBackground: '#fff',
      barButtonBackground: '#0000ff',
      barButtonColor: '#fff',
      barButtonHoverBackground: '#000',
      barButtonHoverColor: '#fff',
      barTextColor: '#000',
      modalButtonBackground: '#0000ff',
      modalButtonHoverBackground: '#000',
    },
    isControlButtonEnabled: false,
  },
});
