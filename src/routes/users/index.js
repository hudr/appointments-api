const express = require('express')
const usersRouter = express.Router()

usersRouter.get('/', (req, res, next) => {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/user',
  })
})

module.exports = usersRouter
