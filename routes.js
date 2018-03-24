const nextRoutes = require('next-routes')
const routes = nextRoutes()

routes
  .add('schedule', '/schedule/:chapter')
  .add('index', '/chapters/:chapter')

module.exports = routes