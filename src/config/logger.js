const { createLogger, format, transports, config } = require('winston')
const { combine, printf } = format

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level}: ${message}`
})

const logger = createLogger({
  levels: config.npm.levels,
  format: combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  )
}

module.exports = logger
