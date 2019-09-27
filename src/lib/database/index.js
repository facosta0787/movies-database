const path = require('path')
const Sequelize = require('sequelize')

let conn = null

function database() {
  if (conn) {
    return conn
  }

  conn = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'movies.sqlite')
  })

  return {
    conn,
    sequelize: Sequelize
  }
}

module.exports = database
