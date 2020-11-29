const pkg = require("./package");
import colors from 'vuetify/es5/util/colors'

module.exports = {
  ssr: false,

  /*
   ** Headers of the page
   */
  head: {
    title: "HRMS : Human Resource Management System." || process.env.npm_package_name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.4/echarts-en.min.js"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3adced" },

  /*
   ** Global CSS
   */
  css: [
    "font-awesome/css/font-awesome.css",
    "roboto-fontface/css/roboto/roboto-fontface.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // "@/plugins/vuetify", 
    "~/plugins/vue-swal",
    "@/plugins/vee-validate",
    "~/plugins/axios",
  ],
  proxy: {
    //-- ตั้งค่า map proxy url api server
    "/api": "http://127.0.0.1:9000",
    ws: true
  },

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/proxy-module
    "@nuxtjs/proxy",
    '@nuxtjs/auth'
  ],

  auth: {
    localStorage: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: { url: '/api/users/logout', method: 'post' },
          user: {
            url: '/api/users/me',
            method: 'get',
            propertyName: false
          },
        },
      },
    },
    redirect: {
      logout: '/',
      callback: '/login',
      home: '/'
    },
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'http://127.0.0.1:9000/api'
    proxy: true // Can be also an object with default options
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
  }
};
