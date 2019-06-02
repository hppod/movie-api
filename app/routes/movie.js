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

route.get('/info-movies', MovieController.getInfoMovies)
route.get('/storyline/:id', MovieController.getStoryline)
route.get('/movies', MovieController.getAllMovies)
route.get('/movie/:id', MovieController.getMovieById)
route.get('/movie-actors/:id', MovieController.getAllActorsOfMovie)
route.get('/movie-directors/:id', MovieController.getAllDirectorsOfMovie)
route.get('/movie-writers/:id', MovieController.getAllWritersOfMovie)
route.get('/movie-reviews/:id', MovieController.getAllReviewsOfMovie)

module.exports = route