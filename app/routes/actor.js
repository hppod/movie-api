//Actor table routes
/*
    GET
    GET BY ID 

    GET WITH MOVIES
    GET BY ID WITH MOVIES
*/

const express = require('express')
const route = express.Router()
const ActorController = require('./../controllers/actor')

route.get('/actors/:page/:column/:order', ActorController.getActorsPage)
route.get('/actor/:id', ActorController.getActorInfo)
route.get('/movies-actor/:id', ActorController.getMoviesOfActor)
route.get('/trailer-movies/actor/:id', ActorController.getTrailerMoviesOfActor)

route.get('/actors', ActorController.getAllActors)
route.get('/actors-movies', ActorController.getActorsAndMovies)
route.get('/actor-movies/:id', ActorController.getActorAndMovies)

route.get('/actors/:page/:search', ActorController.getSearchTerm)

module.exports = route