const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const IS_PROD = process.env.NODE_ENV === 'production'

const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
  },
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.0.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
  ],
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,

  productionSourceMap: false,

  // devServer: {
  //   host: '0.0.0.0',
  //   proxy: {
  //     [process.env.VUE_APP_REQUEST_BASE_URL]: {
  //       target: process.env.VUE_APP_BASE_API,
  //       changeOrigin: true,
  //     },
  //   },
  // },

  css: {
    loaderOptions: {
      sass: { data: '@import "@/assets/scss/variables.scss";' },
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@img', '@/assets/images')
      .set('@comp', '@/components')

    config
      .plugin('html')
      .tap((args) => {
        args[0].title = process.env.VUE_APP_PAGE_TITLE
        if (IS_PROD) {
          args[0].cdn = assetsCDN
        }
        return args
      })
  },

  configureWebpack: (config) => {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
      },
    }

    if (IS_PROD) {
      config.plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 8192,
        }),
        new BundleAnalyzerPlugin(),
      )

      config.externals = {
        ...config.externals,
        ...assetsCDN.externals,
      }
    }
  },
}
