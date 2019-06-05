const sequelize = require('./../../config/config')
const DataTypes = sequelize.DataTypes
const UserModel = require('./../models/user')(sequelize, DataTypes)
const jwt = require('jsonwebtoken')
const secret = require('./secret')

const Authentication = (req, res) => {
    const username = req.body.username
    const pass = req.body.pass

    UserModel.findOne({
        where: {
            USERNAME: username
        }
    })
        .then((login) => {
            if (!login) {
                res.status(403).json({ message: "Dados inválidos!" })
            }

            if (pass === login.PASS) {
                const token = jwt.sign({
                    sub: username,
                    iss: "filmow"
                }, secret.secret)
                res.status(200).json({ message: "Autenticado", username: login.USERNAME, accessToken: token })
            } else {
                res.status(401).json({ message: "Não autenticado. Verifique seus dados" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: "Erro interno" })
        })
}

module.exports = Authentication