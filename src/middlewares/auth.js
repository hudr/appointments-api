const { verify } = require('jsonwebtoken')
const { promisify } = require('util')
const authConfig = require('#config/auth')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send({ error: 'token is missing' })
  const [, token] = authHeader.split(' ')

  try {
    const { secret } = authConfig.jwt
    const decoded = await promisify(verify)(token, secret)
    req.userId = decoded.id

    return next()
  } catch {
    return res.status(401).send({ error: 'invalid token' })
  }
}
