const path = require('path')
const express = require('express')

const server = function () {
  const server = express()
  const publicPathString = path.join(__dirname, '../public')
  const publicPath = express.static(publicPathString)
  const indexPath = path.join(publicPathString, '/index.html')

  server.use('/public', publicPath)
  server.get('/', function (_, res) {
    res.sendFile(indexPath)
  })

  return server
}

const port = (process.env.PORT || 8080)
const app = server()

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
