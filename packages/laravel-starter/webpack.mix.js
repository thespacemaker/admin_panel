/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const path = require('path')
const fs = require('fs-extra')
const mix = require('laravel-mix')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

/*
|---------------------------------------------------------------------
| Inject Vuetify variables in SASS
|---------------------------------------------------------------------
*/
Mix.listen('configReady', (config) => {
  const scssRule = config.module.rules.find((r) => r.test.toString() === /\.scss$/.toString())
  const scssOptions = scssRule.loaders.find((l) => l.loader === 'sass-loader').options

  scssOptions.prependData = '@import "./resources/sass/vuetify/variables";'

  const sassRule = config.module.rules.find((r) => r.test.toString() === /\.sass$/.toString())
  const sassOptions = sassRule.loaders.find((l) => l.loader === 'sass-loader').options

  sassOptions.prependData = '@import "./resources/sass/vuetify/variables"'
})

/*
|---------------------------------------------------------------------
| Load the Vuetify Loader Plugin
|---------------------------------------------------------------------
*/
mix.extend('vuetify', new class {
  webpackConfig (config) {
    config.plugins.push(new VuetifyLoaderPlugin())
  }
})
mix.vuetify()

if (mix.inProduction()) {
  require('laravel-mix-versionhash')

  mix
  // .extract() // Disabled until resolved: https://github.com/JeffreyWay/laravel-mix/issues/1889
  // .version() // Use `laravel-mix-versionhash` for the generating correct Laravel Mix manifest file.
    .versionHash()
} else {
  mix.sourceMaps()
}

/*
|---------------------------------------------------------------------
| Build and copy Vue application assets to 'public/dist' folder
|---------------------------------------------------------------------
*/
mix
  .js('resources/js/app.js', 'public/dist/js')
  .sass('resources/sass/app.scss', 'public/dist/css')
  .webpackConfig({
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, './resources/js'),
        '~': path.join(__dirname, './resources/js')
      }
    },
    output: {
      chunkFilename: 'dist/js/[chunkhash].js',
      path: mix.config.hmr ? '/' : path.resolve(__dirname, './public/build')
    }
  })

mix.then(() => {
  if (!mix.config.hmr) {
    process.nextTick(() => publishAssets())
  }
})

function publishAssets () {
  const publicDir = path.resolve(__dirname, './public')

  if (mix.inProduction()) {
    fs.removeSync(path.join(publicDir, 'dist'))
  }

  fs.copySync(path.join(publicDir, 'build', 'dist'), path.join(publicDir, 'dist'))
  fs.copySync(path.join(publicDir, 'build', 'images'), path.join(publicDir, 'images'))
  fs.removeSync(path.join(publicDir, 'build'))
}
