const winston = require('winston')

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize({
          all: true,
          colors: {
            info: 'yellow',
            error: 'red'
          }
        })
      )
    })
  ]
})

module.exports = logger
