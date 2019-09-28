const path = require('path')
const cheerio = require('cheerio')
const request = require('request-promise-native')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const uuid = require('uuid/v4')

function database() {
  const adapter = new FileSync(path.join(__dirname, 'movies.json'))
  const db = low(adapter)
  //   db.defaults({ movies: [] }).write()
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

const { db, exists } = database()

async function getPageContent(page) {
  try {
    const $ = await request({
      uri: `https://cuevana2espanol.com/ver-pelicula-online/page/${page}/`,
      transform: cheerio.load
    })
    return $
  } catch (err) {
    console.error(err)
    return process.exit(1)
  }
}

function scrapPage($) {
  try {
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

      const rating = $(this)
        .find('div.poster > div.rating')
        .text()
        .trim()

      if (!exists('title', title)) {
        db.get('movies')
          .push({
            id: uuid(),
            title,
            synopsis,
            year,
            rating,
            genres: genres.join(', '),
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

    const pages = $('div.pagination > span')
      .first()
      .text()
      .split(' ')
      .pop()

    const webDataPromises = []
    webDataPromises.push($)

    if (Number(pages) > 1) {
      for (let i = 2; i <= Number(pages); i += 1) {
        webDataPromises.push(getPageContent(i))
      }
    }

    const webDataResults = await Promise.all(webDataPromises)

    webDataResults.forEach(scrapPage)
    console.log(
      'Process finished,',
      db.get('movies').value().length,
      'movies scraped'
    )
    process.exit(0)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

Main()
