const db = require('./index')
const { movies: scrapedMovies } = require('../../scrape/movies.json')

async function seed() {
  const { Movie } = db

  try {
    scrapedMovies.forEach(async movie => {
      Movie.create({
        id: movie.id,
        title: movie.title,
        synopsis: movie.synopsis,
        year: movie.year,
        genres: movie.genres.join(', '),
        posterUrl: movie.posterUrl
      }).then(result => {
        console.log(result.movie)
      })
    })
  } catch (err) {
    console.error(err)
  }
}

seed()
