const db = require('./index')
const { movies: scraped } = require('../../scrape/movies.json')

function seed() {
  const { Movies } = db

  try {
    console.log('Seeding movies data ...', scraped.length, 'Movies')

    Movies.bulkCreate(scraped, {
      ignoreDuplicates: true
    })
      .then(() => {
        return Movies.findAll({ raw: true })
      })
      .then(movies => console.log(movies))
  } catch (err) {
    console.error(err)
  }
}

seed()
