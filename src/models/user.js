const { model, Schema } = require('#config/database')
const { v4: uuidv4 } = require('uuid')
const { hash } = require('bcryptjs')

const UserSchema = new Schema(
  {
    _id: { type: String, default: uuidv4() },

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
  const hashedPassword = await hash(this.password, 10)
  this.password = hashedPassword
  next()
})

const User = model('User', UserSchema)

module.exports = User
