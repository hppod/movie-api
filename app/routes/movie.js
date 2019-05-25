//Movie table routes
/*
    GET
    GET BY ID
    
    GET ACTORS
    GET DIRECTORS
    GET WRITERS
    GET REVIEWS
*/

const express = require('express')
const route = express.Router()
const MovieController = require('./../controllers/movie')

route.get('/movie', MovieController.getAllMovies)
route.get('/movie/:id', MovieController.getMovieById)

module.exports = route