//Writer table controller
/*
    getAllWriters - implemented
    getWriterById - implemented

    getWritersAndMovies - implemented
    getWriterAndMovies - implemented
*/

const { WriterModel, MovieModel, WMModel } = require('./../models')

WMModel.belongsTo(MovieModel, { as: 'MOVIE', foreignKey: 'MOVIE_ID' })
WMModel.belongsTo(WriterModel, { as: 'WRITER', foreignKey: 'WRITER_ID' })

class Writer {

    getAllWriters(req, res) {
        WriterModel.findAll({ raw: true })
            .then((allWriters) => res.status(200).json({ message: 'Get all writers success', allWriters }))
            .catch((error) => res.status(500).json({ message: 'Error on get all writers', error }))
    }

    getWriterById(req, res) {
        WriterModel.findOne({
            where: {
                ID: req.params.id
            }
        })
            .then((writerById) => res.status(200).json({ message: 'Get writer by id success', writerById }))
            .catch((error) => res.status(500).json({ message: 'Error on get writer by id', error }))
    }

    getWritersAndMovies(req, res) {
        WMModel.findAll({
            include: [
                {
                    model: MovieModel, as: 'MOVIE'
                },
                {
                    model: WriterModel, as: 'WRITER'
                }
            ]
        })
            .then((writersAndMovies) => res.status(200).json({ message: 'Get writers and movies success', writersAndMovies }))
            .catch((error) => res.status(500).json({ message: 'Error on get writers and movies', error }))
    }

    getWriterAndMovies(req, res) {
        WMModel.findAll({
            where: {
                WRITER_ID: req.params.id
            },
            include: [
                {
                    model: MovieModel, as: 'MOVIE'
                },
                {
                    model: WriterModel, as: 'WRITER'
                }
            ]
        })
            .then((writerAndMovies) => res.status(200).json({ message: 'Get writer and movies success', writerAndMovies }))
            .catch((error) => res.status(500).json({ message: 'Error on get writer and movies', error }))
    }
}

module.exports = new Writer()