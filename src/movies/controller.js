const { Movies } = require('../lib/database')
const { paginateResults } = require('./utils')

const getMovies = async (_, __, { req }) => {
  console.log(req.headers.origin)
  try {
    const movies = await Movies.findAll({ raw: true })
    return movies
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}

const getMovie = async (_, args) => {
  try {
    const movie = await Movies.findOne({
      where: { id: args.id }
    })
    return movie
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}

const getMoviesPaginated = async (_, { pageSize = 20, after }) => {
  const allMovies = await Movies.findAll({
    order: [['year', 'DESC']],
    raw: true
  })

  const movies = paginateResults({
    after,
    pageSize,
    results: allMovies
  })

  return {
    movies,
    cursor: movies.length ? movies[movies.length - 1].id : null,
    hasMore: movies.length
      ? movies[movies.length - 1].id !== allMovies[allMovies.length - 1].id
      : false
  }
}

module.exports = {
  getMovie,
  getMovies,
  getMoviesPaginated
}
