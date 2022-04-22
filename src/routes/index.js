const express = require('express')
const routes = express.Router()

// Aplication Routes
const usersRouter = require('./users')

routes.use('/user', usersRouter)

routes.get('/', function (req, res) {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/',
  })
})

module.exports = routes
