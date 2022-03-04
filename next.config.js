require('dotenv').config()
const path = require('path')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
//const withCss = require('@zeit/next-css')
const withFonts = require('next-fonts')
const withOptimizedImages = require('next-optimized-images')
const withPlugins = require('next-compose-plugins')
//const withSass = require('@zeit/next-sass')
//const withSourceMaps = require('@zeit/next-source-maps')
const withTranspileModules = require('next-transpile-modules')

// copy env values from .env file into nextjs config object
// this allows seperation of config from whats needed in client browser vs server-side code
function addSettingsToConfig(config) {
  const publicRuntimeConfig = {}
  const serverRuntimeConfig = {}
  Object.keys(process.env).forEach(setting => {
    if (setting.startsWith('REACT_APP')) {
      publicRuntimeConfig[setting] = process.env[setting]
    } else {
      serverRuntimeConfig[setting] = process.env[setting]
    }
  })
  config.publicRuntimeConfig = publicRuntimeConfig
  config.serverRuntimeConfig = serverRuntimeConfig
}

// transpile ES6 code in node_modules to ES5
const transpileModulesOptions = {
  transpileModules: ['flatted'],
}

const optimizedImagesOptions = {
  // no optimization of image size unless something is set here
  // see default options for this plugin here - https://github.com/cyrilwanner/next-optimized-images
  optimizeImages: false,
}

const filterWarningsOptions = {
  exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
}

// Exclude tests in build
const ignoreLoader = {
  test: /\.(test|test\.js)$/,
  loader: 'ignore-loader',
}

// avoid .mjs compile error - https://github.com/uber/nebula.gl/issues/285
const handleMjs = {
  type: 'javascript/auto',
  test: /\.mjs$/,
  use: [],
}

/* Configuration */
const nextAppConfig = {
  // using custom routing so disable page routing
  //useFileSystemPublicRoutes: false,
  webpack: (config, { dev, isServer }) => {
    // Fixes npm packages that depend on `fs` module
    
    // if (!isServer) {
    //     config.resolve.fallback = {
    //     fs: false,
    //     net: false,
    //     tls: false,
    //   }
    // }

    if (!isServer) {
        config.node = {
          fs: 'empty',
          net: 'empty',
          tls: 'empty',
        }
      }

    // allows relative file paths for imports
    // config.resolve.modules = [...config.resolve.modules, './frontend']
    // // config.module.rules.push(urlLoader); // Not using this for images - instead, using withOptimizedImages
    // config.module.rules.push(ignoreLoader)
    // config.module.rules.push(handleMjs)
    // config.plugins.push(new FilterWarningsPlugin(filterWarningsOptions)) // ignore CSS order warnings
    return config
  },
}

addSettingsToConfig(nextAppConfig)

/* Export everything with plugins and Next app config */
module.exports = withPlugins(
  [
    [withTranspileModules, transpileModulesOptions],
    [withOptimizedImages, optimizedImagesOptions],
    [withFonts],    
  ],
  nextAppConfig,
)
