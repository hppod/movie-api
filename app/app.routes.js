const express = require('express')
const route = express.Router()
const FilmeController = require('./filme')

route.get('/filmes', FilmeController.get)
route.post('/filme', FilmeController.post)
route.delete('/filme/:id', FilmeController.delete)

module.exports = route