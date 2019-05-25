//RR table controller
/*
    POST
    PUT
    DELETE
*/

const { RRModel } = require('./../models')

class RR {

    createReview(req, res) {
        RRModel.create(req.body)
            .then((review) => res.status(201).json({ message: 'Insert success', review }))
            .catch((error) => res.status(500).json({ message: 'Error on insert review', error }))
    }

    updateReview(req, res) {
        RRModel.update(req.body, {
            where: {
                ID: req.params.id
            }
        })
            .then((reviewUpdated) => res.status(200).json({ message: 'Update success', reviewUpdated }))
            .catch((error) => res.status(500).json({ message: 'Error on update review', error }))
    }

    destroyReview(req, res) {
        RRModel.destroy({
            where: {
                ID: req.params.id
            }
        })
            .then((reviewDestroyed) => res.status(200).json({ message: 'Destroy success', reviewDestroyed }))
            .catch((error) => res.status(500).json({ message: 'Error on destroy review', error }))
    }

}

module.exports = new RR()