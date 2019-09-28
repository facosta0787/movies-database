const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const gqlHttp = require('./middlewares/gqlHttp')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/api', gqlHttp)

module.exports = app
