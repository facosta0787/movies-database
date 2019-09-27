const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const movies = require('./scrape/movies.json')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  return res.json({
    status: 200,
    message: 'Ok',
    data: {
      movies
    }
  })
})

module.exports = app
