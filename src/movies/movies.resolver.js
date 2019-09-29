module.exports = {
  Query: {
    getMovies: (root, args, { req }) => {
      console.log('Context', req.headers)
      return [
        {
          id: 'dcdc-dfhd-qazd-wefb',
          title: 'Movie',
          synopsis: 'La Movie',
          year: 2019,
          rating: '7.8',
          genres: 'Comedy',
          posterUrl: 'http://poster.com'
        }
      ]
    }
  }
}
