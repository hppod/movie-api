//Creating model user table
/*
    ID INT  NOT NULL PK_USER AI
    NAME VARCHAR(100) NOT NULL
    USERNAME VARCHAR(100) NOT NULL UK_USERNAME
    EMAIL VARCHAR(100) NOT NULL UK_EMAIL
    PASS VARCHAR(100) NOT NULL
*/

module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('UserModel', {

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
        USERNAME: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false,
            unique: true
        },
        EMAIL: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false,
            unique: true
        },
        PASS: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false,
        }
    },
        {
            tableName: 'USER',
            timestamps: false
        }
    )
    return UserModel
}
