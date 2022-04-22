const express = require('express')
const usersRouter = express.Router()

usersRouter.get('/', (req, res, next) => {
  res.json({ message: 'Hello world /users!' })
})

module.exports = usersRouter
