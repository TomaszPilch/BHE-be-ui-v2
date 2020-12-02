// @flow
const axios = require('axios')
const fs = require('fs')
const { mergeDeepRight } = require('ramda')

const serverUrl = process.env.API_URL

// todo use passphrase
// todo add changes from changelog for ui components
// todo uppy
module.exports = () => {
  const axiosApi = axios.create({
    baseURL: `${serverUrl}/api2/v1`,
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  axiosApi
    .get('/locale/locales-with-namespaces')
    .then((response) => {
      const { locales, namespaces } = response.data
      locales.forEach((locale) => {
        namespaces.forEach((namespace) => {
          axiosApi
            .get(`/locale/${locale}/${namespace}`)
            .then((localeFileResponse) => {
              const folder = `${__dirname}/../../public/static/locales/${locale}`
              const file = `${namespace}.json`
              const fullPath = `${folder}/${file}`
              if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true })
              }
              let defaultData = {}
              if (fs.existsSync(fullPath)) {
                defaultData = JSON.parse(fs.readFileSync(fullPath))
              }
              fs.writeFileSync(fullPath, JSON.stringify(mergeDeepRight(defaultData, localeFileResponse.data)))
              console.info(`Locale saved: /locale/${locale}/${namespace}`)
            })
            .catch((e) => {
              console.error(`Cannot get locales: ${locale}/${namespace}`)
              console.error(e)
            })
        })
      })
    })
    .catch((e) => {
      console.error('Cannot get locales with namespaces')
      console.error(e)
    })
}
