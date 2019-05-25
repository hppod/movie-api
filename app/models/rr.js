//Creating model RR table
/*
    USER_ID INT NOT NULL FK USER PK
    MOVIE_ID INT NOT NULL FK MOVIE PK
    RATING INT NOT NULL
    REVIEW VARCHAR(1000) ALLOW NULL
    DATE_REVIEW DATE ALLOW NULL
*/

module.exports = (sequelize, DataTypes) => {
    const RRModel = sequelize.define('RRModel', {

        USER_ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            allowNull: false,
            references: 'USER',
            referencesKey: 'ID'
        },
        MOVIE_ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            allowNull: false,
            references: 'MOVIE',
            referencesKey: 'ID'
        },
        RATING: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        REVIEW: {
            type: DataTypes.STRING,
            required: false,
            allowNull: true,
            max: 1000
        },
        DATE_REVIEW: {
            type: DataTypes.DATE,
            required: false,
            allowNull: false
        }
    },
        {
            tableName: 'RR',
            timestamps: false
        }
    )
    return RRModel
}