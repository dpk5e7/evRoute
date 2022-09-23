const User = require("./User");
const ElectricVehicle = require("./ElectricVehicle");
const Trip = require("./Trip");
const Fleet = require("./Fleet");

// Many-to-Many
User.belongsToMany(ElectricVehicle, {
  through: { model: Fleet, unique: false },
});
ElectricVehicle.belongsToMany(User, {
  through: { model: Fleet, unique: false },
});

// Adding this makes it a Super-Many-to-Many
User.hasMany(Fleet);
Fleet.belongsTo(User);
ElectricVehicle.hasMany(Trip);
Trip.belongsTo(ElectricVehicle);


// Many-to-Many
User.belongsToMany(ElectricVehicle, {
  through: { model: Trip, unique: false },
});
ElectricVehicle.belongsToMany(User, {
  through: { model: Trip, unique: false },
});

// Adding this makes it a Super-Many-to-Many
User.hasMany(Trip);
Trip.belongsTo(User);
ElectricVehicle.hasMany(Trip);
Trip.belongsTo(ElectricVehicle);


module.exports = { User, ElectricVehicle, Trip, Fleet };
