const router = require("express").Router();
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
