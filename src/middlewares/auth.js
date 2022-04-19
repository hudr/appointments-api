const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).send({ error: 'JWT token is missing' })

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET)

    req.userId = decoded.id

    return next()
  } catch {
    throw res.status(401).send({ error: 'Invalid JWT Token' })
  }
}
