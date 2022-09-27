const router = require("express").Router();
const { ElectricVehicle } = require("../../models");
const isAuthenticated = require("../../utils/auth");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Get Electric Vehicles from NREL
router.get("/vehicles", isAuthenticated, async (req, res) => {
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var params = {
      api_key: process.env.NREL_API_KEY,
      fuel_id: 41,
    };

    let apiUrl =
      "https://developer.nrel.gov/api/vehicles/v1/light_duty_automobiles.json?";
    for (let p in params) {
      apiUrl += `${p}=${params[p]}&`;
    }
    apiUrl = encodeURI(apiUrl.slice(0, -1));

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get Electric Vehicles from NREL & update database
router.put("/vehicles", isAuthenticated, async (req, res) => {
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var params = {
      api_key: process.env.NREL_API_KEY,
      fuel_id: 41,
    };

    let apiUrl =
      "https://developer.nrel.gov/api/vehicles/v1/light_duty_automobiles.json?";
    for (let p in params) {
      apiUrl += `${p}=${params[p]}&`;
    }
    apiUrl = encodeURI(apiUrl.slice(0, -1));

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    let intUpdated = 0;
    let intInserted = 0;

    // Need to save them to the database here.
    for (const ev of data.result) {
      // find by model_year, manufacturer_name, & model
      const evInDB = await ElectricVehicle.findOne({
        where: {
          model_year: ev.model_year,
          manufacturer_name: ev.manufacturer_name,
          model: ev.model,
        },
      });

      if (evInDB !== null) {
        // if found, update
        await evInDB.update({
          photo_url: ev.photo_url,
          electric_range: ev.electric_range,
          engine_type: ev.engine_type,
          engine_size: ev.engine_size,
          manufacturer_name: ev.manufacturer_name,
          manufacturer_url: ev.manufacturer_url,
          fuel_name: ev.fuel_name,
          category_name: ev.category_name,
          drivetrain: ev.drivetrain,
          alternative_fuel_economy_combined:
            ev.alternative_fuel_economy_combined,
          alternative_fuel_economy_city: ev.alternative_fuel_economy_city,
          alternative_fuel_economy_highway: ev.alternative_fuel_economy_highway,
        });

        intUpdated++;
      } else {
        // else, insert
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
          alternative_fuel_economy_combined:
            ev.alternative_fuel_economy_combined,
          alternative_fuel_economy_city: ev.alternative_fuel_economy_city,
          alternative_fuel_economy_highway: ev.alternative_fuel_economy_highway,
        });

        intInserted++;
      }
    }

    res.status(200).json({
      message: `${intUpdated} vehicles updated.\n${intInserted} vehicles inserted.`,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get Electric Charging Stations from NREL
router.get("/stations", isAuthenticated, async (req, res) => {
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var params = {
      api_key: process.env.NREL_API_KEY,
      latitude: req.query.latitude,
      longitude: req.query.longitude,
      radius: req.query.radius, // miles
      status: "E",
      fuel_type: "ELEC",
      limit: req.query.limit, // 200 is the max limit
      access: "public",
    };

    let apiUrl =
      "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?";
    for (let p in params) {
      apiUrl += `${p}=${params[p]}&`;
    }
    apiUrl = encodeURI(apiUrl.slice(0, -1));

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
