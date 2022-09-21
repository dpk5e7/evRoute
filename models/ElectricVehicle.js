const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ElectricVehicle extends Model {}

ElectricVehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    manufacturer_name: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drivetrain: {
      type: DataTypes.STRING,
    },
    electric_range: {
      type: DataTypes.INTEGER,
    },
    engine_type: {
      type: DataTypes.STRING,
    },
    engine_size: {
      type: DataTypes.STRING,
    },
    fuel_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternative_fuel_economy_combined: {
      type: DataTypes.DECIMAL,
    },
    alternative_fuel_economy_city: {
      type: DataTypes.DECIMAL,
    },
    alternative_fuel_economy_highway: {
      type: DataTypes.DECIMAL,
    },
    photo_url: {
      type: DataTypes.STRING,
    },
    manufacturer_url: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "electric_vehicle",
  }
);

module.exports = ElectricVehicle;
