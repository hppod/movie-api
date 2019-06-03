//Director table controller
/* 
    getAllDirectors - implemented
    getDirectorById - implemented

    getDirectorsAndMovies - implemented
    getDirectorAndMovies - implemented
*/

const { DirectorModel, MovieModel, DMModel } = require('./../models')

DMModel.belongsTo(MovieModel, { as: 'MOVIE', foreignKey: 'MOVIE_ID' })
DMModel.belongsTo(DirectorModel, { as: 'DIRECTOR', foreignKey: 'DIRECTOR_ID' })

class Director {

    getAllDirectors(req, res) {
        DirectorModel.findAll({ raw: true })
            .then((allDirectors) => res.status(200).json({ message: 'Get all directors success', allDirectors }))
            .catch((error) => res.status(500).json({ message: 'Error on get all directors', error }))
    }

    getDirectorById(req, res) {
        DirectorModel.findOne({
            where: {
                ID: req.params.id
            }
        })
            .then((directorById) => res.status(200).json({ message: 'Get director by id success', directorById }))
            .catch((error) => res.status(500).json({ message: 'Error on get director by id', error }))
    }

    getDirectorsAndMovies(req, res) {
        DMModel.findAll({
            include: [
                {
                    model: DirectorModel, as: 'DIRECTOR'
                },
                {
                    model: MovieModel, as: 'MOVIE'
                }
            ]
        })
            .then((directorsAndMovies) => res.status(200).json({ message: 'Get directors and movies success', directorsAndMovies }))
            .catch((error) => res.status(500).json({ message: 'Error on get directors and movies', error }))
    }

    getDirectorAndMovies(req, res) {
        DMModel.findAll({
            where: {
                DIRECTOR_ID: req.params.id
            },
            include: [
                {
                    model: DirectorModel, as: 'DIRECTOR'
                },
                {
                    model: MovieModel, as: 'MOVIE'
                }
            ]
        })
            .then((directorAndMovies) => res.status(200).json({ message: 'Get director and movies success', directorAndMovies }))
            .catch((error) => res.status(500).json({ message: 'Error on get director and movies', error }))
    }
}

module.exports = new Director()