//Movie table controller
/*
    GET
    GET BY ID
    
    GET ACTORS
    GET DIRECTORS
    GET WRITERS
    GET REVIEWS
*/

const { MovieModel } = require('./../models')

class Movie {

    getAllMovies(req, res) {
        MovieModel.findAll({ raw: true })
            .then((allMovies) => res.status(200).json({ message: 'Get all movies success', allMovies }))
            .catch((error) => res.status(500).json({ message: 'Error on get all movies', error }))
    }

    getMovieById(req, res) {
        MovieModel.findOne({
            where: {
                ID: req.params.id
            }
        })
            .then((movieById) => res.status(200).json({ message: 'Get movie by id success', movieById }))
            .catch((error) => res.status(500).json({ message: 'Error on get movie by id', error }))
    }
}

module.exports = new Movie()