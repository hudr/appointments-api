const express = require('express')
const usersRouter = express.Router()
const { celebrate, Segments, Joi } = require('celebrate')
const authMiddleware = require('../../middlewares/auth')
const UserController = require('../../controllers/user')

usersRouter.get('/index', authMiddleware, UserController.index)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
      cpf: Joi.string().required(),
    },
  }),
  UserController.store
)

usersRouter.get('/', (req, res, next) => {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/user',
  })
})

module.exports = usersRouter
