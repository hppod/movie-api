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

route.get('/movies/:page/:column/:order/', MovieController.getMoviesPage)
route.get('/genres', MovieController.getGenres)
route.get('/storyline/:id', MovieController.getStoryline)
route.get('/poster/:id', MovieController.getPoster)
route.get('/movie/:id', MovieController.getMovieById)
route.get('/movie-actors/:id', MovieController.getAllActorsOfMovie)
route.get('/avg-rating/:id', MovieController.getAverageRating)
route.get('/movie-reviews/:id', MovieController.getReviews)
route.get('/movie-directors/:id', MovieController.getDirectorsOfMovie)
route.get('/movie-writers/:id', MovieController.getWritersOfMovie)

route.get('/movies/:page/:search', MovieController.getSearchTerm)

route.get('/movies-intheaters', MovieController.getMoviesInTheaters)
route.get('/movies-comingsoon', MovieController.getMoviesComingSoon)

module.exports = route