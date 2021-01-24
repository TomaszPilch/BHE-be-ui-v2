const express = require('express')
const next = require('next')
const compression = require('compression')
const bodyParser = require('body-parser')

const processLocale = require('@bheui/server-functions/lib/locale/process-locale')

const apiLogin = require('./pages/api/login').default

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const renderPageOrContinue = (req, res, nextCl) => {
  if (req.path.includes('_next') || req.path.includes('api/')) {
    return nextCl()
  }
  const query = { ...req.params }
  if (req.params.id) {
    query.page = '/[module]/[action]/[id]'
  } else if (req.params.action) {
    query.page = '/[module]/[action]'
  } else if (req.params.module) {
    query.page = '/[module]'
  }
  return app.render(req, res, req.path, query)
}

app.prepare().then(async () => {
  await processLocale()
  const server = express()
  server.use(`/static`, express.static('public/static'))
  server.use(compression())

  server.get('/is-ready', (req, res) => {
    res.sendStatus(200)
  })

  server.use('/api/login', bodyParser.json({ limit: '50mb' }))
  server.post('/api/login', apiLogin)

  server.get('/:module/:action/:id', renderPageOrContinue, (req, res) => handle(req, res))
  server.get('/:module/:action', renderPageOrContinue, (req, res) => handle(req, res))

  server.get('*', (req, res) => handle(req, res))

  server.listen(3000, (err) => {
    if (err) {
      console.error(err.stack)
      process.exit(1)
    }
    console.log(`> Ready on http://localhost:${3000}`)
  })
})
