require('dotenv/config')
const { hash, compare } = require('bcryptjs')
const { addHours, isAfter } = require('date-fns')
const { sign } = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const authConfig = require('#config/auth')
const User = require('#models/user')
const UserToken = require('#models/userToken')
const { isValidCPF } = require('#utils/utils')

function generateToken(params = {}) {
  const { secret, expiresIn } = authConfig.jwt
  return sign(params, secret, {
    expiresIn,
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

  async update(req, res) {
    try {
      const { name, email, phone, cpf, password, oldPassword } = req.body

      if (!isValidCPF(cpf)) {
        return res.status(400).send({ error: 'cpf inválido' })
      }

      const user = await User.findById(req.userId).select('+password')

      if (!user) {
        return res.status(400).send({ error: 'usuário não encontrado' })
      }

      const userWithUpdatedEmail = await User.findOne({ email })

      if (userWithUpdatedEmail && userWithUpdatedEmail._id !== req.userId) {
        return res.status(400).send({ error: 'e-mail já utilizado' })
      }

      if (password && !oldPassword) {
        return res.status(400).send({
          error: 'senha antiga não informada',
        })
      }

      if (password && oldPassword) {
        const checkOldPassword = await compare(oldPassword, user.password)

        if (!checkOldPassword) {
          return res.status(400).send({
            error: 'senha antiga incorreta',
          })
        }

        user.password = await hash(password, 10)
      }

      user.name = name
      user.email = email
      user.phone = phone
      user.cpf = cpf

      const data = await User.findByIdAndUpdate(req.userId, user, {
        new: true,
      })

      res.send(data)
    } catch (err) {
      res.status(400).send({ error: 'erro ao atualizar dados' })
    }
  },

  async forgot(req, res) {
    try {
      const { email } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).send({ error: 'usuário não encontrado' })
      }

      // Essa abordagem garante que tokens sejam gerados quando não existentes e sejam renovados quando existentes
      await UserToken.findOneAndUpdate(
        { userId: user._id },
        { token: uuidv4() },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )

      res.status(204).send()
    } catch (err) {
      res.status(400).send({ error: 'erro ao criar token de reset de senha' })
    }
  },

  async reset(req, res) {
    try {
      const { token, password } = req.body

      const userToken = await UserToken.findOne({ token })

      if (!userToken) {
        return res.status(400).send({ error: 'o token não existe' })
      }

      const user = await User.findOne({ _id: userToken.userId })
      const tokenCreatedAt = userToken.createdAt
      const compareDate = addHours(tokenCreatedAt, 2)

      if (isAfter(Date.now(), compareDate)) {
        res.status(400).send({ error: 'token expirado' })
      }

      user.password = await hash(password, 10)

      await User.findOneAndUpdate({ _id: userToken.userId }, user)

      await UserToken.findOneAndDelete({ userId: user._id })

      res.status(204).send()
    } catch (err) {
      res.status(400).send({ error: 'erro ao resetar senha' })
    }
  },

  async authenticate(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(400).send({ error: 'usuário não encontrado' })
    }

    if (!(await compare(password, user.password))) {
      return res.status(400).send({ error: 'erro na autenticação' })
    }

    user.password = undefined

    res.send({ user, token: generateToken({ id: user.id }) })
  },
}
