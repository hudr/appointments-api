const mongoose = require('mongoose')

mongoose.connect(
  `${
    process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost/appointments'
  }`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
)

mongoose.Promise = global.Promise

module.exports = mongoose
