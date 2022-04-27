const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { errors } = require('celebrate')
const routes = require('#routes')
require('express-async-errors')
require('dotenv/config')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

app.use(errors())

app.disable('x-powered-by')

app.listen(process.env.APP_PORT || '80', () => {
  console.log(`Servidor iniciado na porta: ${process.env.APP_PORT || '80'}.`)
})
