const express = require('express')
const routes = express.Router()

// Aplication Routes
const usersRouter = require('./users')

routes.use('/users', usersRouter)

routes.get('/', function (req, res) {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/',
  })
})

module.exports = routes
