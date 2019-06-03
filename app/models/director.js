//Creating model director table
/*
    ID INT NOT NULL PK_ACTOR AI
    NAME VARC HAR(100) NOT NULL
    BORNDATE DATE NOT NULL
*/

module.exports = (sequelize, DataTypes) => {
    const DirectorModel = sequelize.define('DirectorModel', {

        ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NAME: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        },
        BORNDATE: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        }
    },
        {
            tableName: 'DIRECTOR',
            timestamps: false
        }
    )
    return DirectorModel
}