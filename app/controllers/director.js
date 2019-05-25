//Director table controller
/*
    GET
    GET BY ID

    GET WITH MOVIES
    GET BY ID WITH MOVIES
*/

const { DirectorModel } = require('./../models')

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
}

module.exports = new Director()