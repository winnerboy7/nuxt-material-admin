const pkg = require("./package");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  mode: "spa",

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
    "~/assets/style/theme.styl",
    "~/assets/style/app.styl",
    "font-awesome/css/font-awesome.css",
    "roboto-fontface/css/roboto/roboto-fontface.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vuetify", 
    "@/plugins/vee-validate",
    "~/plugins/axios",
  ],
  proxy: {
    //-- ตั้งค่า map proxy url api server
    "/api": "http://127.0.0.1:9000",
    ws: true
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://github.com/nuxt-community/proxy-module
    "@nuxtjs/proxy",
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'http://127.0.0.1:9000/api'
    proxy: true // Can be also an object with default options
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
