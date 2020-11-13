#!/usr/bin/env node

const { conn, Movies, sequelize } = require('./index')
const { movies: scraped } = require('../../scrape/movies.json')

function cleanMoviesTable() {
  return new Promise((resolve, reject) => {
    conn
      .query('delete from movies;', {
        type: sequelize.QueryTypes.SELECT,
        raw: true
      })
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

function seed() {
  try {
    console.log('Reseting database...')
    console.log('Seeding movies data ...', scraped.length, 'Movies')

    Movies.bulkCreate(scraped, {
      ignoreDuplicates: true
    })
      .then(() => {
        return Movies.findAll({ raw: true })
      })
      .then(movies => console.log(`Seeded movies: ${movies.length}`))
  } catch (err) {
    console.error(err)
  }
}

cleanMoviesTable().then(seed)
