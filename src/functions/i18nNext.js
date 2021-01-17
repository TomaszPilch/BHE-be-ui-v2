const NextI18Next = require('next-i18next').default
const { localeSubpaths, defaultLanguage, otherLanguages } = require('next/config').default().publicRuntimeConfig
const path = require('path')
const intervalPlural = require('i18next-intervalplural-postprocessor')

const nextI18n = new NextI18Next({
  otherLanguages: [defaultLanguage, ...otherLanguages],
  defaultLanguage,
  localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
  saveMissing: false,
  interpolation: {
    escapeValue: false,
  },
})

nextI18n.i18n.use(intervalPlural)

module.exports = nextI18n
