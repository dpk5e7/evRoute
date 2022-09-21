const sequelize = require("../config/connection");
const { User, ElectricVehicle } = require("../models");

const userData = require("./userData.json");
const evData = require("./evData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const ev of evData.result) {
    await ElectricVehicle.create({
      model: ev.model,
      model_year: ev.model_year,
      photo_url: ev.photo_url,
      electric_range: ev.electric_range,
      engine_type: ev.engine_type,
      engine_size: ev.engine_size,
      manufacturer_name: ev.manufacturer_name,
      manufacturer_url: ev.manufacturer_url,
      fuel_name: ev.fuel_name,
      category_name: ev.category_name,
      drivetrain: ev.drivetrain,
      alternative_fuel_economy_combined: ev.alternative_fuel_economy_combined,
      alternative_fuel_economy_city: ev.alternative_fuel_economy_city,
      alternative_fuel_economy_highway: ev.alternative_fuel_economy_highway,
    });
  }

  process.exit(0);
};

seedDatabase();
