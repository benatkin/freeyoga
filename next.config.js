module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  },
  serverRuntimeConfig: {
    apiBaseUrl: `http://localhost:${process.env.PORT || 3000}/api`
  },
  publicRuntimeConfig: {
    apiBaseUrl: '/api'
  }
}
