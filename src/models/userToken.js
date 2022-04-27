const { model, Schema } = require('#config/database')
const { v4: uuidv4 } = require('uuid')

const UserTokenSchema = new Schema(
  {
    _id: { type: String, default: uuidv4() },

    userId: {
      type: String,
      default: uuidv4(),
      ref: 'User',
    },

    token: {
      type: String,
      default: uuidv4(),
    },
  },
  { timestamps: true }
)

const UserToken = model('UserToken', UserTokenSchema)

module.exports = UserToken
