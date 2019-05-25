//Director table routes
/*
    GET
    GET BY ID

    GET WITH MOVIES
    GET BY ID WITH MOVIES
*/

const express = require('express')
const route = express.Router()
const DirectorController = require('./../controllers/director')

route.get('/director', DirectorController.getAllDirectors)
route.get('/director/:id', DirectorController.getDirectorById)

module.exports = route