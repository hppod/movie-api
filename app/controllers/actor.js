//Actor table controller
/*
    get AllActors - implemented
    getActorById - implemented

    getActorsAndMovies - implemented
    getActorAndMovies - implemented
*/

const sequelize = require('./../../config/config')
const { ActorModel, MovieModel, AMModel } = require('./../models')

AMModel.belongsTo(MovieModel, { as: 'MOVIE', foreignKey: 'MOVIE_ID' })
AMModel.belongsTo(ActorModel, { as: 'ACTOR', foreignKey: 'ACTOR_ID' })

class Actor {

    // NAME ASC
    getActorsPage(req, res) {
        let limit = 8
        let offset = 0

        ActorModel.findAndCountAll()
            .then((data) => {
                let page = req.params.page
                let column = req.params.column
                let order = req.params.order
                let pages = Math.ceil(data.count / limit)
                offset = limit * (page - 1)

                ActorModel.findAll({
                    attributes: [
                        'ID',
                        'NAME',
                        'BORNDATE',
                        'ACTOR_URL'
                    ],
                    order: [
                        [`${column}`, `${order}`]
                    ],
                    limit: limit,
                    offset: offset
                })
                    .then((actors) => res.status(200).json({ result: actors, count: data.count, pages: pages }))
            })
            .catch((error) => res.status(500).json(error))
    }

    getActorInfo(req, res) {
        let id = req.params.id
        sequelize.query(
            `SELECT 
            A.ID,
            A.NAME,
            A.BORNDATE,
            TIMESTAMPDIFF(YEAR,
                A.BORNDATE,
                CURDATE()) AS AGE,
            A.BIOGRAPHY,
            A.NACIONALITY,
            A.INITIALS,
            TIMESTAMPDIFF(YEAR,
                A.EARLYCAREER,
                CURDATE()) AS CAREER,
            A.ACTOR_URL,
            (SELECT DISTINCT
                    COUNT(AM.MOVIE_ID)
                FROM
                    AM
                WHERE
                    AM.ACTOR_ID = ${id}) AS NUMBERMOVIES
        FROM
            ACTOR AS A
                INNER JOIN
            AM ON AM.ACTOR_ID = A.ID
        WHERE
            A.ID = ${id}
        LIMIT 1`
        )
            .then((result) => res.status(200).json(result[0]))
            .catch((error) => res.status(500).json(error))
    }

    getMoviesOfActor(req, res) {
        sequelize.query(
            `SELECT
                M.ID,
                M.TITLE,
                AM.CHARACTER_NAME,
                M.POSTER_URL,
                M.DATE_PREMIERE
            FROM MOVIE AS M
            INNER JOIN AM ON M.ID = AM.MOVIE_ID
            INNER JOIN ACTOR AS A ON A.ID = AM.ACTOR_ID
            WHERE A.ID = ${req.params.id}
            ORDER BY M.DATE_PREMIERE ASC
            `
        )
            .then((result) => res.status(200).json(result[0]))
            .catch((error) => res.status(500).json(error))
    }

    getTrailerMoviesOfActor(req, res) {

    }

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