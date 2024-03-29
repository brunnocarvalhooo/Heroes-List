require('dotenv').config()

const express = require('express')
const { errors } = require('celebrate')
const Youch = require('youch')
const cors = require('cors')

require('express-async-errors')

const routes = require('./routes')
const uploadConfig = require('../../config/upload')

const server = express()

server.use(express.json())

server.use(cors({ origin: '*' }))

server.get('/hello', (_, res) => {
  return res.send({ message: 'Hello world!' })
})

server.use('/files', express.static(uploadConfig.directory))

server.use(routes)

server.use(errors())

server.use(async (error, request, response, _) => {
  const appError = await new Youch(error, request).toJSON()

  return response.status(appError.error.status || 500).json({
    error: {
      code: appError.error.status || 500,
      message: appError.error.message || 'Internal server error',
    }
  })
})

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em ${process.env.PORT}`)
})