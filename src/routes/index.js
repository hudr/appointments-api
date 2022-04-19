const express = require('express')
const routes = express.Router()

const usersRouter = require('./users')

routes.use('/user', usersRouter)

module.exports = routes
