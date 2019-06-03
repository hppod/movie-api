//Actor table controller
/*
    get AllActors - implemented
    getActorById - implemented

    getActorsAndMovies - implemented
    getActorAndMovies - implemented
*/

const { ActorModel, MovieModel, AMModel } = require('./../models')

AMModel.belongsTo(MovieModel, { as: 'MOVIE', foreignKey: 'MOVIE_ID' })
AMModel.belongsTo(ActorModel, { as: 'ACTOR', foreignKey: 'ACTOR_ID' })

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

    getActorsAndMovies(req, res) {
        AMModel.findAll({
            include: [
                {
                    model: ActorModel, as: 'ACTOR'
                },
                {
                    model: MovieModel, as: 'MOVIE'
                }
            ]
        })
            .then((actorsAndMovies) => res.status(200).json({ message: 'Get actors and movies success', actorsAndMovies }))
            .catch((error) => res.status(500).json({ message: 'Error on get actors and movies', error }))
    }

    getActorAndMovies(req, res) {
        AMModel.findAll({
            where: {
                ACTOR_ID: req.params.id
            },
            include: [
                {
                    model: ActorModel, as: 'ACTOR'
                },
                {
                    model: MovieModel, as: 'MOVIE'
                }
            ]
        })
            .then((actorAndMovies) => res.status(200).json({ message: 'Get actor and movies success', actorAndMovies }))
            .catch((error) => res.status(500).json({ message: 'Error on get actor and movies', error }))
    }
}

module.exports = new Actor()