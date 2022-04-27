module.exports = {
  jwt: {
    secret: process.env.APP_SECRET || 'MD5Hash',
    expiresIn: '1d',
  },
}
