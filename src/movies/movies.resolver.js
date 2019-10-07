const controller = require('./controller')

module.exports = {
  Query: {
    getMovies: controller.getMovies,
    getMovie: controller.getMovie,
    movies: controller.getMoviesPaginated
  }
}
