const path = require('path')
const gqlHttp = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { importSchema } = require('graphql-import')
const resolvers = require('../movies/movies.resolver')

const gqlhttpMiddleware = gqlHttp(() => {
  return new Promise(resolve => {
    const next = () => {
      const withGraphiQl = process.env.NODE_ENV !== 'production'

      const typeDefs = importSchema(
        path.join(__dirname, '../graphql/schema.graphql')
      )

      const schema = makeExecutableSchema({
        typeDefs,
        resolvers
      })

      resolve({
        schema,
        graphiql: withGraphiQl,
        context: {}
      })
    }

    try {
      next()
    } catch (err) {
      console.error(err)
    }
  })
})

module.exports = gqlhttpMiddleware
