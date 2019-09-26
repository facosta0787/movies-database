const cheerio = require('cheerio')
const request = require('request-promise-native')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

async function Main() {
  try {
    const adapter = new FileSync('movies.json')
    const db = low(adapter)
    // db.defaults({ movies: [] }).write()

    const $ = await request({
      uri: 'https://cuevana2espanol.com/ver-pelicula-online/page/3/',
      transform: cheerio.load
    })

    $('article.item.movies').each(function(i, el) {
      const title = $(this).find('h4').text()
      const year = $(this).find('.data > span').text()
      const synopsis = $(this).find('div.texto').text()
      const genres = []
      $(this).find('.mta a').each(function() {
        genres.push($(this).text())
      })


      db.get('movies')
      .push({
        title,
        synopsis,
        year,
        genres
      })
      .write()
    })

  } catch(e) {
    console.log(e)
  }
}

Main()