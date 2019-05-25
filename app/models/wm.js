//Creating model WM table
/*
    MOVIE_ID INT NOT NULL FK MOVIE PK
    WRITER_ID INT NOT NULL FK ACTOR PK
*/

module.exports = (sequelize, DataTypes) => {
    const WMModel = sequelize.define('WMModel', {

        MOVIE_ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            allowNull: false,
            references: 'MOVIE',
            referencesKey: 'ID'
        },
        WRITER_ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            allowNull: false,
            references: 'WRITER',
            referencesKey: 'ID'
        }
    },
        {
            tableName: 'WM',
            timestamps: false
        }
    )
    return WMModel
}