const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Fleet extends Model {}

Fleet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    electric_vehicle_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "electric_vehicle",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "fleet",
  }
);

module.exports = Fleet;
