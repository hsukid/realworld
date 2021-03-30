export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Conduit',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css',
      },
    ],
  },
  // https://github.com/gothinkster/realworld-starter-kit
  css: ['@/assets/fonts.css', '@/assets/main.css'],

  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.push(
        ...[
          {
            name: 'register',
            path: '/register',
            component: resolve(__dirname, 'pages/login.vue'),
          },
          {
            name: 'create',
            path: '/create',
            component: resolve(__dirname, 'pages/article/edit.vue'),
          },
        ]
      )
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/request.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
