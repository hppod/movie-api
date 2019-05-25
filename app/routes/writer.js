//Writer table routes
/*
    GET
    GET BY ID

    GET WITH MOVIES
    GET BY ID WITH MOVIES
*/

const express = require('express')
const route = express.Router()
const WriterController = require('./../controllers/writer')

route.get('/writer', WriterController.getAllWriters)
route.get('/writer/:id', WriterController.getWriterById)

module.exports = route