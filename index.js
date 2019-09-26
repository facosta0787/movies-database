const http = require('http')
const app = require('./src/app')

app.set('port', 3000)
const server = http.createServer(app)

server.listen(3000)
server.on('listening', function() {
  console.log('Server running on port http://localhost:3000')
})
server.on('error', function(error) {
  console.log(error)
})
