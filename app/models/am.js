//Creating model AM table
/*
    MOVIE_ID  INT NOT NULL FK MOVIE PK
    ACTOR_ID INT NOT NULL FK ACTOR PK
*/

module.exports = (sequelize, DataTypes) => {
    const AMModel = sequelize.define('AMModel', {

        MOVIE_ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            allowNull: false,
            references: 'MOVIE',
            referencesKey: 'ID'
        },
        ACTOR_ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            allowNull: false,
            references: 'ACTOR',
            referencesKey: 'ID'
        },
        CHARACTER_NAME: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        },
    },
        {
            tableName: 'AM',
            timestamps: false
        }
    )
    return AMModel
}