if (! ['staging', 'production'].includes(process.env.NODE_ENV)) {
  require('now-env')
}

const next = require('next')
const routes = require('./routes')
const api = require('./lib/api')
const app = next({
  dev: !['production', 'staging'].includes(process.env.NODE_ENV)
})
const handler = routes.getRequestHandler(app)
const express = require('express')
app.prepare().then(() => {
  const app = express()
  app.use('/api', api)
  app.use(handler)
  app.listen(process.env.PORT || 3000)
})