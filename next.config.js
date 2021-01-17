const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {}

const processOtherLanguages = (languages) => {
  const langArray = typeof languages === 'string' ? languages.split(',') : []
  return langArray.filter((lang) => !!lang)
}

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
    apiUrl: process.env.API_URL,
    copyright: process.env.COPYRIGHT,
    appTitle: process.env.APP_TITLE || 'DevX BE',
    defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
    otherLanguages: processOtherLanguages(process.env.OTHER_LANGUAGES) || [],
  },
  serverRuntimeConfig: {
    clientSecret: process.env.CLIENT_SECRET,
    clientId: process.env.CLIENT_ID,
  },
}
