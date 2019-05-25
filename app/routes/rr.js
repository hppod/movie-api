//RR table routes
/*
    POST
    PUT
    DELETE
*/

const express = require('express')
const route = express.Router()
const RRController = require('./../controllers/rr')

route.post('/rr', RRController.createReview)
route.put('/rr/:id', RRController.updateReview)
route.delete('/rr/:id', RRController.destroyReview)

module.exports = route