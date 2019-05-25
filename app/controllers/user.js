//User table controller
/*
    GET BY ID
    PUT
    DELETE

    GET BY ID WITH REVIEW

    CREATE USER
    LOGIN
*/

const { UserModel } = require('./../models')

class User {

    getUserById(req, res) {
        UserModel.findOne({
            where: {
                ID: req.params.id
            }
        })
            .then((userById) => res.status(200).json({ message: 'Get user by id success', userById }))
            .catch((error) => res.status(500).json({ message: 'Error on get user by id', error }))
    }

    updateUser(req, res) {
        UserModel.update(req.body, {
            where: {
                ID: req.params.id
            }
        })
            .then((userUpdated) => res.status(200).json({ message: 'Update success', userUpdated }))
            .catch((error) => res.status(500).json({ message: 'Error on update user', error }))
    }

    destroyUser(req, res) {
        UserModel.destroy({
            where: {
                ID: req.params.id
            }
        })
            .then((userDestroyed) => res.status(200).json({ message: 'Destroy success', userDestroyed }))
            .catch((error) => res.status(500).json({ message: 'Error on destroy user', error }))
    }

    createUser(req, res) {
        UserModel.create(req.body)
            .then((userCreated) => res.status(201).json({ message: 'Create success', userCreated }))
            .catch((error) => res.status(500).json({ message: 'Error on create user', error }))
    }
}

module.exports = new User()