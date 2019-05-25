//Creating model DM table
/*
    MOVIE_ID INT NOT NULL FK MOVIE PK
    DIRECTOR_ID INT NOT NULL FK ACTOR PK
*/

module.exports = (sequelize, DataTypes) => {
    const DMModel = sequelize.define('DMModel', {

        MOVIE_ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            allowNull: false,
            references: 'MOVIE',
            referencesKey: 'ID'
        },
        DIRECTOR_ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            allowNull: false,
            references: 'DIRECTOR',
            referencesKey: 'ID'
        }
    },
        {
            tableName: 'DM',
            timestamps: false
        }
    )
    return DMModel
}