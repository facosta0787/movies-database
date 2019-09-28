const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./lib/database')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  return res.json({
    status: 200,
    message: 'Ok',
    data: {
      movies: await db.Movies.findAll({ raw: true })
    }
  })
})

module.exports = app
