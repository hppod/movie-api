const Sequelize = require('sequelize')

const sequelize = new Sequelize('movies', 'movies-dba', 'moviesdba-1234', {
    host: 'mysql465.umbler.com',
    port: '41890',
    dialect: 'mysql'
})

module.exports = sequelize

//f