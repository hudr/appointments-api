require('dotenv/config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { isValidCPF } = require('../utils/utils')

function generateToken(params = {}) {
  return jwt.sign(params, `${process.env.APP_SECRET}` || 'MD5Hash', {
    expiresIn: '7d',
  })
}

module.exports = {
  async index(req, res) {
    try {
      const users = await User.find().sort({ createdAt: -1 })
      return res.send({ users })
    } catch (err) {
      return res.status(400).send({ error: 'erro ao carregar usuários' })
    }
  },

  async store(req, res) {
    try {
      const { email, cpf } = req.body

      if (!isValidCPF(cpf)) {
        return res.status(400).send({ error: 'cpf inválido' })
      }

      if (cpf && (await User.findOne({ cpf }))) {
        return res.status(400).send({ error: 'usuário existente' })
      }

      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'e-mail já utilizado' })
      }

      const user = await User.create(req.body)

      user.password = undefined
      user.cpf = undefined

      return res.send({ user, token: generateToken({ id: user.id }) })
    } catch (err) {
      res.status(400).send({ error: 'o cadastro falhou' })
    }
  },

  async authenticate(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(400).send({ error: 'usuário não encontrado' })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'erro na autenticação' })
    }

    user.password = undefined

    res.send({ user, token: generateToken({ id: user.id }) })
  },
}
