//User table routes
/*
    GET BY ID
    PUT
    DELETE

    GET BY ID WITH REVIEW

    CREATE USER
    LOGIN
*/

const express = require('express')
const route = express.Router()
const UserController = require('./../controllers/user')

route.get('/user/:id', UserController.getUserById)
route.put('/user/:id', UserController.updateUser)
route.delete('/user/:id', UserController.destroyUser)
route.post('/user', UserController.createUser)
route.get('/my-reviews/:id', UserController.myReviews)

module.exports = route