  // const webpack = require('webpack')

  const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
      base: '/szapp/'
    }
  } : {}



export default {
  ...routerBase,
  mode: 'spa',
  // mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      {rel: 'stylesheet', href:'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&family=Noto+Sans+TC:wght@300;500;700&family=Noto+Serif+JP:wght@300;500&family=Noto+Serif+TC:wght@200;500;600&display=swap" rel="stylesheet'}


    ]
  },
  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#000000' },
  loading: '~/components/LoadingCover',

  // loadingIndicator:{
  //   name:'folding-cube'
  // },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],


  transition:{
    name:'fade',
    mode:'out-in'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     mapboxgl: 'mapbox-gl'
    //   })
    // ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // config.module.rules.push({
      //   test: /\.csv$/i,
      //   loader: 'raw-loader'
      // })
    }
  },

  // router: {
    // base: '/szapp/'
    // mode: 'hash'
  // }


}
