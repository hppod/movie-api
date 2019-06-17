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
        let column = req.params.column
        let order = req.params.order
        let genre = req.query.genre || 'IS NOT NULL'
        let date_premiere = req.query.date || 'IS NOT NULL'
        let search = req.query.search || 'IS NOT NULL'

        sequelize.query(
            `SELECT 
                COUNT(*) AS ITEMS
            FROM MOVIE
            WHERE GENRE ${genre} AND DATE_PREMIERE ${date_premiere} AND TITLE ${search}`
        )
            .then((data) => {
                const items = data[0][0].ITEMS
                let page = req.params.page
                let pages = Math.ceil(items / limit)
                offset = limit * (page - 1)
                sequelize.query(
                    `SELECT
                        M.ID,
                        M.TITLE,
                        LEFT(M.STORYLINE, 75) AS STORYLINE,
                        M.POSTER_URL,
                        M.DATE_PREMIERE
                    FROM MOVIE AS M
                    WHERE GENRE ${genre} AND DATE_PREMIERE ${date_premiere} AND TITLE ${search}
                    ORDER BY ${column} ${order}
                    LIMIT ${limit}
                    OFFSET ${offset}`
                )
                    .then((movies) => res.status(200).json({ result: movies[0], count: items, pages: pages }))
            })
            .catch((error) => res.status(500).json(error))
    }

    getGenres(req, res) {
        sequelize.query(
            `SELECT DISTINCT
                M.GENRE
            FROM MOVIE AS M
            ORDER BY M.GENRE ASC`
        )
            .then((genres) => res.status(200).json(genres[0]))
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

    getDirectorsOfMovie(req, res) {
        sequelize.query(
            `SELECT
                D.ID,
                D.NAME
            FROM DIRECTOR AS D
            INNER JOIN DM ON D.ID = DM.DIRECTOR_ID
            INNER JOIN MOVIE AS M ON M.ID = DM.MOVIE_ID
            WHERE M.ID = ${req.params.id}`
        )
            .then((directors) => res.status(200).json(directors[0]))
            .catch((error) => res.status(500).json(error))
    }

    getWritersOfMovie(req, res) {
        sequelize.query(
            `SELECT
                W.ID,
                W.NAME
            FROM WRITER AS W
            INNER JOIN WM ON W.ID = WM.WRITER_ID
            INNER JOIN MOVIE AS M ON M.ID = WM.MOVIE_ID
            WHERE M.ID = ${req.params.id}`
        )
            .then((writers) => res.status(200).json(writers[0]))
            .catch((error) => res.status(500).json(error))
    }

    getAllActorsOfMovie(req, res) {
        sequelize.query(
            `SELECT 
            A.ID, A.NAME, A.ACTOR_URL, AM.CHARACTER_NAME
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