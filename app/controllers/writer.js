//Writer table controller
/*
    getAllWriters - implemented
    getWriterById - implemented

    getWritersAndMovies - to implement
    getWriterAndMovies - to implement
*/

const { WriterModel } = require('./../models')

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
}

module.exports = new Writer()