const http = require('http')
const chalk = require('chalk')
const app = require('./src/app')
const { conn } = require('./src/lib/database')

function main() {
  app.set('port', 3000)
  const server = http.createServer(app)

  server.listen(3000)
  server.on('listening', function() {
    console.log(
      chalk.green('[api] Server running on port http://localhost:3000/api')
    )
  })
  server.on('error', function(error) {
    console.log(error)
  })
}

;(async function() {
  try {
    await conn.authenticate()
    await conn.sync({ force: false })
    console.log(chalk.green('[database] Database connected successfully'))
    main()
  } catch (err) {
    console.log(
      chalk.green('[database] Unable to connect to the database', err)
    )
  }
})()
