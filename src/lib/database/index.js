const path = require('path')
const Sequelize = require('sequelize')

let db = null

function database() {
  if (db) {
    return db
  }

  db = {
    conn: new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, 'movies.sqlite')
    }),
    sequelize: Sequelize
  }

  db.Movie = db.conn.import('../../movies/movies.model.js')

  return db
}

module.exports = database()
