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

route.get('/directors', DirectorController.getAllDirectors)
route.get('/director/:id', DirectorController.getDirectorById)
route.get('/directors-movies', DirectorController.getDirectorsAndMovies)
route.get('/director-movies/:id', DirectorController.getDirectorAndMovies)

module.exports = route