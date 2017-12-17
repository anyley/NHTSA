const express = require('express')
const server = express()

server.use(express.static('public'))

const port = (process.env.PORT || 8080)

server.listen(port)
console.log(`Listening at http://localhost:${port}`)
