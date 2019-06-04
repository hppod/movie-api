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
const { MovieModel } = require('./../models')

class Movie {

    getMoviesPage(req, res) {
        let limit = 8
        let offset = 0

        MovieModel.findAndCountAll()
            .then((data) => {
                let page = req.params.page
                let pages = Math.ceil(data.count / limit)
                offset = limit * (page - 1)
                MovieModel.findAll({
                    attributes: [
                        'ID',
                        'TITLE',
                        [sequelize.fn('LEFT', sequelize.col('STORYLINE'), 75), 'STORYLINE'],
                        'POSTER_URL'
                    ],
                    order: [
                        ['DATE_PREMIERE', 'DESC']
                    ],
                    limit: limit,
                    offset: offset
                })
                    .then((movies) => res.status(200).json({ 'result': movies, 'count': data.count, 'pages': pages }))
            })
            .catch((error) => res.status(500).json(error))
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

    getPoster(req, res) {
        sequelize.query(
            `SELECT POSTER_URL FROM MOVIE WHERE ID = ${req.params.id}`
        )
            .then((posterUrl) => res.status(200).json(posterUrl))
            .catch((error) => res.status(500).json(error))
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
        sequelize.query(
            `SELECT 
            A.ID, A.CHARACTER_NAME, A.NAME, A.ACTOR_URL
        FROM
            ACTOR AS A
                INNER JOIN
            AM ON AM.ACTOR_ID = A.ID
                INNER JOIN
            MOVIE AS M ON AM.MOVIE_ID = M.ID
        WHERE
            M.ID = ${req.params.id}`
        )
            .then((actorsOfMovie) => res.status(200).json(actorsOfMovie[0]))
            .catch((error) => res.status(500).json({ message: 'Error on get actors of movie', error }))
    }

    getAverageRating(req, res) {
        sequelize.query(
            `SELECT 
            FORMAT(AVG(RATING), 1) AS RATING_AVG
        FROM
            RR
        WHERE
            MOVIE_ID = ${req.params.id}`
        )
            .then((avgRating) => res.status(200).json(avgRating[0]))
            .catch((error) => res.status(500).json({ message: 'Error on get avg rating', error }))
    }

    getReviews(req, res) {
        sequelize.query(
            `SELECT 
            U.USERNAME,
            FORMAT(R.RATING, 0) AS RATING,
            R.REVIEW,
            R.DATE_REVIEW,
            M.TITLE
        FROM
            RR AS R
                INNER JOIN
            USER AS U ON U.ID = R.USER_ID
                INNER JOIN
            MOVIE AS M ON M.ID = R.MOVIE_ID
        WHERE
            R.MOVIE_ID = ${req.params.id}
        ORDER BY DATE_REVIEW DESC`
        )
            .then((reviews) => res.status(200).json(reviews[0]))
            .catch((error) => res.status(500).json({ message: 'Error on get reviews', error }))
    }

}

module.exports = new Movie()