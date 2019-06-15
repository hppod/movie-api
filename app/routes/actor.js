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

route.get('/actors/:page', ActorController.getActorsPage)

route.get('/actors', ActorController.getAllActors)
route.get('/actor/:id', ActorController.getActorById)
route.get('/actors-movies', ActorController.getActorsAndMovies)
route.get('/actor-movies/:id', ActorController.getActorAndMovies)

module.exports = route