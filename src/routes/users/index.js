const express = require('express')
const usersRouter = express.Router()
const { celebrate, Segments, Joi } = require('celebrate')
const authMiddleware = require('#middlewares/auth')
const UserController = require('#controllers/user')

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

usersRouter.put(
  '/profile/update',
  authMiddleware,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
      phone: Joi.string().required(),
      cpf: Joi.string().required(),
    },
  }),
  UserController.update
)

usersRouter.post(
  '/password/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  UserController.forgot
)

usersRouter.post(
  '/password/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
      password: Joi.string().required(),
    },
  }),
  UserController.reset
)

usersRouter.post(
  '/authenticate',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UserController.authenticate
)

usersRouter.get('/', (req, res, next) => {
  res.status(200).send({
    message: 'Hello world!',
    endpoint: '/users',
  })
})

module.exports = usersRouter
