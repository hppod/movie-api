//Actor table controller
/*
    getAllActors - implemented
    getActorById - implemented

    getActorsAndMovies - to implement
    getActorAndMovies - to implement
*/

const { ActorModel } = require('./../models')

class Actor {

    getAllActors(req, res) {
        ActorModel.findAll({ raw: true })
            .then((allActors) => res.status(200).json({ message: 'Get all actors success', allActors }))
            .catch((error) => res.status(500).json({ message: 'Error on get all actors', error }))
    }

    getActorById(req, res) {
        ActorModel.findOne({
            where: {
                ID: req.params.id
            }
        })
            .then((actorById) => res.status(200).json({ message: 'Get actor by id success', actorById }))
            .catch((error) => res.status(500).json({ message: 'Error on get actor by id', error }))
    }
}

module.exports = new Actor()