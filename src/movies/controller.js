const { Movies } = require('../lib/database')

const getMovies = async (root, args, { req }) => {
  console.log(req.headers.origin)
  try {
    const movies = await Movies.findAll({ raw: true })
    return movies
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}

module.exports = {
  getMovies
}
