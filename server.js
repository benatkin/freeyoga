const next = require('next')
const routes = require('./routes')
const app = next({
  dev: ['production', 'staging'].includes(process.env.NODE_ENV)
})
const handler = routes.getRequestHandler(app)
const express = require('express')
app.prepare().then(() => {
  express().use(handler).listen(process.env.PORT || 3000)
})