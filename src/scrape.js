const path = require('path')
const cheerio = require('cheerio')
const request = require('request-promise-native')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const uuid = require('uuid/v4')

function database() {
  const adapter = new FileSync(path.join(__dirname, 'movies.json'))
  const db = low(adapter)

  // const movies = require('./movies.json')
  // if (Object.keys(movies).length === 0) {
  //   db.defaults({ movies: [] }).write()
  //   console.log('movies db created !')
  // }

  const exists = (key, value) => {
    const found = db
      .get('movies')
      .find(movie => {
        return movie[key].toLowerCase() === value.toLowerCase()
      })
      .value()

    return !!found
  }

  return { db, exists }
}

async function scrapPage(page = 1) {
  try {
    const { db, exists } = database()

    const $ = await request({
      uri: `https://cuevana2espanol.com/ver-pelicula-online/page/${page}/`,
      transform: cheerio.load
    })

    $('article.item.movies').each(function() {
      const title = $(this)
        .find('h4')
        .text()
      const year = $(this)
        .find('.data > span')
        .text()
      const synopsis = $(this)
        .find('div.texto')
        .text()
      const genres = []
      $(this)
        .find('.mta a')
        .each(function() {
          genres.push($(this).text())
        })
      const posterUrl = $(this)
        .find('div.poster > img')
        .attr('src')

      if (!exists('title', title)) {
        db.get('movies')
          .push({
            id: uuid(),
            title,
            synopsis,
            year,
            genres,
            posterUrl
          })
          .write()
      } else {
        console.error(`Movie ${title}, already exists!`)
      }
    })
  } catch (e) {
    console.error(e)
    return false
  }

  return true
}

async function Main() {
  console.log('Process started...')
  try {
    const $ = await request({
      uri: 'https://cuevana2espanol.com/ver-pelicula-online',
      transform: cheerio.load
    })

    let pages = $('div.pagination > span')
      .first()
      .text()
      .split(' ')
      .pop()

    do {
      console.log(`Scraping page number ${pages}`)
      scrapPage(pages)
      pages -= 1
    } while (pages !== 0)
  } catch (e) {
    console.log(e)
  }
}

Main()
