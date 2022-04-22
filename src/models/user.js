const mongoose = require('../config/database')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },

    name: {
      type: String,
      require: true,
    },

    cpf: {
      type: String,
      require: true,
      select: false,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    phone: {
      type: String,
      required: true,
    },

    avatarUrl: {
      type: String,
      default: null,
    },

    admin: {
      type: Boolean,
      default: false,
    },

    provider: {
      type: Boolean,
      default: false,
    },

    client: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
