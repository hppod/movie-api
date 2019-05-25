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

route.get('/actor', ActorController.getAllActors)
route.get('/actor/:id', ActorController.getActorById)

module.exports = route