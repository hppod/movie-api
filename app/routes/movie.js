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

route.get('/movies/:page', MovieController.getMoviesPage)
route.get('/storyline/:id', MovieController.getStoryline)
route.get('/poster/:id', MovieController.getPoster)
route.get('/movie/:id', MovieController.getMovieById)
route.get('/movie-actors/:id', MovieController.getAllActorsOfMovie)
route.get('/avg-rating/:id', MovieController.getAverageRating)
route.get('/movie-reviews/:id', MovieController.getReviews)

module.exports = route