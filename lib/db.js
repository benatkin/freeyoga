const knex = require('knex')

const db = knex({
  client: 'mysql2',
  connection: {
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
})

module.exports = db