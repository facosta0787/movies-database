const { Movies } = require('../lib/database')

const findAll = () => Movies.findAll({ raw: true })

module.exports = {
  findAll
}
