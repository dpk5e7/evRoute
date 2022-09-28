const router = require("express").Router();
const { User, Trip } = require("../../models");
const isAuthenticated = require("../../utils/auth");

// Get all trips for a user
router.get("/", isAuthenticated, async (req, res) => {
  try {
    // Do stuff here
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get a single trip
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    // Do stuff here
  } catch (err) {
    res.status(400).json(err);
  }
});

// Save a trip
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const data = await Trip.create(
      {
        title: req.body.title,
        source_address: req.body.source_address,
        destination_address: req.body.destination_address,
        user_id: req.body.user_id,
        electric_vehicle_id: req.body.electric_vehicle_id,
      },
    );

    if (!data) {
      res.status(404).json({ message: "Failed to save trip!" });
      return;
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a trip
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    // Do stuff here
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
