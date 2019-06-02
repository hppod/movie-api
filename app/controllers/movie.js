//Movie table controller
/*
    getAllMovies - implemented
    getMovieById - implemented
    
    getAllActorsOfMovie - implemented
    getAllDirectorsOfMovie - implemented
    getAllWritersOfMovie - implemented
    getAllReviewsOfMovie - implemented
*/

const sequelize = require('./../../config/config')
const { MovieModel, ActorModel, AMModel, DirectorModel, DMModel, WriterModel, WMModel, RRModel } = require('./../models')

class Movie {

    getInfoMovies(req, res) {
        MovieModel.findAll({
            attributes: [
                'ID',
                'TITLE',
                [sequelize.fn('LEFT', sequelize.col('STORYLINE'), 75), 'STORYLINE'],
                'POSTER_URL'
            ],
            order: [
                ['DATE_PREMIERE', 'DESC']
            ]
        })
            .then((infoMovies) => res.status(200).json(infoMovies))
            .catch((error) => res.status(500).json({ message: 'Error on get ingo movies', error }))
    }

    getAllMovies(req, res) {
        MovieModel.findAll({ raw: true })
            .then((allMovies) => res.status(200).json(allMovies))
            .catch((error) => res.status(500).json({ message: 'Error on get all movies', error }))
    }

    getMovieById(req, res) {
        MovieModel.findOne({
            where: {
                ID: req.params.id
            }
        })
            .then((movieById) => res.status(200).json(movieById))
            .catch((error) => res.status(500).json({ message: 'Error on get movie by id', error }))
    }

    getStoryline(req, res) {
        sequelize.query(
            `SELECT 
            M.ID,
            M.STORYLINE,
            GROUP_CONCAT(DISTINCT ' ', D.NAME) AS DIRECTORS,
            GROUP_CONCAT(DISTINCT ' ', W.NAME) AS WRITERS
        FROM
            MOVIE AS M
                INNER JOIN
            DM ON DM.MOVIE_ID = M.ID
                INNER JOIN
            DIRECTOR AS D ON D.ID = DM.DIRECTOR_ID
                INNER JOIN
            WM ON WM.MOVIE_ID = M.ID
                INNER JOIN
            WRITER AS W ON W.ID = WM.WRITER_ID
        WHERE
            M.ID = ${req.params.id}`
        )
            .then((storyline) => res.status(200).json(storyline[0]))
            .catch((error) => res.status(500).json({ message: 'Error on get storyline', error }))
    }

    getAllActorsOfMovie(req, res) {
        AMModel.findAll({
            where: {
                MOVIE_ID: req.params.id
            },
            include: [
                {
                    model: ActorModel, as: 'ACTOR'
                }
            ]
        })
            .then((actorsOfMovie) => res.status(200).json({ message: 'Get actors of movie success', actorsOfMovie }))
            .catch((error) => res.status(500).json({ message: 'Error on get actors of movie', error }))
    }

    getAllDirectorsOfMovie(req, res) {
        DMModel.findAll({
            where: {
                MOVIE_ID: req.params.id
            },
            include: [
                {
                    model: DirectorModel, as: 'DIRECTOR'
                }
            ]
        })
            .then((directorsOfMovie) => res.status(200).json({ message: 'Get directors of movie success', directorsOfMovie }))
            .catch((error) => res.status(500).json({ message: 'Error on get directors of movie', error }))
    }

    getAllWritersOfMovie(req, res) {
        WMModel.findAll({
            where: {
                MOVIE_ID: req.params.id
            },
            include: [
                {
                    model: WriterModel, as: 'WRITER'
                }
            ]
        })
            .then((writersOfMovie) => res.status(200).json({ message: 'Get writers of movie success', writersOfMovie }))
            .catch((error) => res.status(500).json({ message: 'Error on get writers of movie', error }))
    }

    getAllReviewsOfMovie(req, res) {
        RRModel.findAll({
            where: {
                MOVIE_ID: req.params.id
            }
        })
            .then((reviewsOfMovie) => res.status(200).json({ message: 'Get reviews of movie success', reviewsOfMovie }))
            .catch((error) => res.status(500).json({ message: 'Error on get reviews of movie', error }))
    }
}

module.exports = new Movie()