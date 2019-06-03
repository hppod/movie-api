//Creating model writer table
/*
    ID INT NOT NULL PK_ACTOR AI
    NAME VARCHAR(100) NO T NULL
    BORNDATE DATE NOT NULL
*/

module.exports = (sequelize, DataTypes) => {
    const WriterModel = sequelize.define('WriterModel', {

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
            tableName: 'WRITER',
            timestamps: false
        }
    )
    return WriterModel
}