//Creating model movie table
/*
    ID INT NOT NULL PK_MOVIE AI
    TITLE VARCHAR(100) NOT NULL
    DATE_PREMIERE DATE NOT NULL
    AGE INT NOT NULL
    DURATION TIME NOT NULL
    GENRE VARCHAR(50) NOT NULL
    STORYLINE VARCHAR(1000) NOT NULL
    POSTER_URL VARCHAR(2083) NOT NULL
    TRAILER_URL VARCHAR(2083) NOT NULL
*/

module.exports = (sequelize, DataTypes) => {
    const MovieModel = sequelize.define('MovieModel', {

        ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        TITLE: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        },
        DATE_PREMIERE: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        AGE: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        DURATION: {
            type: DataTypes.TIME,
            required: true,
            allowNull: false
        },
        GENRE: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            max: 50
        },
        STORYLINE: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            max: 1000
        },
        POSTER_URL: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            max: 2083
        },
        TRAILER_URL: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            max: 2083
        }
    },
        {
            tableName: 'MOVIE',
            timestamps: false
        }
    )
    return MovieModel
}