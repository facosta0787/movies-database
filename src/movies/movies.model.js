const database = require('../lib/database')

const { sequelize } = database()

const Movie = sequelize.define('movie', {
  id: {
    type: sequelize.UUID,
    primaryKey: true
  }
})

module.exports = Movie
