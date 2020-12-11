const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {}

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
    apiUrl: process.env.API_URL,
    copyright: process.env.COPYRIGHT,
    appTitle: process.env.APP_TITLE || 'DevX BE',
  },
  serverRuntimeConfig: {
    clientSecret: process.env.CLIENT_SECRET,
    clientId: process.env.CLIENT_ID,
  },
}
