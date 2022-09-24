const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User_Profile extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User_Profile.init(
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
    modelName: "userProfile",
    }
);

module.exports = User_Profile;

