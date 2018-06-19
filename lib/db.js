if (! ['staging', 'production'].includes(process.env.NODE_ENV)) {
  require('now-env')
}
const knex = require('knex')

const connectionParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: require('fs').readFileSync('./config/ca-cert.pem', 'utf8')
  },
  charset: 'utf8mb4'
}

if (connectionParams.host === '127.0.0.1') {
  delete connectionParams['ssl']
}

const db = knex({
  client: 'mysql2',
  connection: connectionParams
})

module.exports = db