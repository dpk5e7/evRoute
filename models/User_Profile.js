const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserProfile extends Model {}

UserProfile.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        },  
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscore: true,
    modelName: "user_profile",
    }
);

module.exports = UserProfile;

