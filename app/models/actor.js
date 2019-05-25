//Creating model actor table
/*
    ID INT NOT NULL PK_ACTOR AI
    NAME VARCHAR(100) NOT NULL
    BORNDATE DATE NOT NULL
*/

module.exports = (sequelize, DataTypes) => {
    const ActorModel = sequelize.define('ActorModel', {

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
            tableName: 'ACTOR',
            timestamps: false
        }
    )
    return ActorModel
}