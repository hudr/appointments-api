const express = require('express')
const usersRouter = express.Router()

usersRouter.get('/helloworld', (req, res, next) => {
  res.json({ message: 'Hello world buddy!' })
})

module.exports = usersRouter
