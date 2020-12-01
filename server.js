import { serverUrl } from '@bheui/components/lib/services/Api'

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const axios = require('axios')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const serverUrl = process.env.API_URL

app.prepare().then(() => {
  createServer((req, res) => {
    // process translation files

    const axiosApi = axios.create({
      baseURL: `${serverUrl}/api/v1`,
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // axios api get all locales
    // axios api get all namespaces
    // axios api get files
    // use passphrase

    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
