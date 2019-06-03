const sequelize = require('./../database/sequelize')

class Filme {

    get(req, res) {
        sequelize.query(
            `SELECT * FROM FILME`
        )
            .then((filmes) => res.json(filmes[0]))
            .catch((error) => res.json(error))
    }

    post(req, res) {
        const id = req.body.id
        const nome = req.body.nome
        const genero = req.body.genero

        sequelize.query(
            `INSERT INTO FILME VALUES (${id}, '${nome}', '${genero}')`
        )
            .then((filme) => res.json(filme))
            .catch((error) => res.json(error))
    }

    delete(req, res) {
        const id = req.params.id

        sequelize.query(
            `DELETE FROM FILME WHERE ID = ${id}`
        )
            .then((remove) => res.json(remove))
            .catch((error) => res.json(error))
    }

}

module.exports = new Filme()