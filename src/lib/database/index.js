const path = require('path')
const Sequelize = require('sequelize')
const sqlite = require('sqlite3')
const logger = require('../../utils/logger')

const env = process.env.NODE_ENV
let db = null

function database() {
  if (db) {
    return db
  }

  db = {
    conn: new Sequelize({
      dialect: 'sqlite',
      dialectModule: sqlite,
      storage: path.join(__dirname, 'movies.sqlite'),
      logging: env === 'production' ? false : msg => logger.info(msg)
    }),
    sequelize: Sequelize
  }

  db.Movies = db.conn.import('../../movies/movies.model.js')

  return db
}

module.exports = database()
