if (! ['staging', 'production'].includes(process.env.NODE_ENV)) {
  require('now-env')
}

const auth = require('./lib/auth')
const next = require('next')
const routes = require('./routes')
const api = require('./lib/api')
const app = next({
  dev: !['production', 'staging'].includes(process.env.NODE_ENV)
})
const handler = routes.getRequestHandler(app)
const express = require('express')
const cookieSession = require('cookie-session')
app.prepare().then(() => {
  const app = express()

  app.use(cookieSession({
    name: 'freeyoga',
    keys: [process.env.SESSION_KEY],
    maxAge: 14 * 24 * 60 * 60 * 1000
  }))
  app.use(express.json())

  app.use('/api', api)
  app.use('/auth', auth)
  app.use(handler)
  app.listen(process.env.PORT || 3000)
})