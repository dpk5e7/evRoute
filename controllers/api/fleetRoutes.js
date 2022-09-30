const router = require("express").Router();
const { Fleet } = require("../../models");
const isAuthenticated = require("../../utils/auth");

// Insert a new Fleet Item
router.post("/", isAuthenticated, async (req, res) => {
  try {
    // Do stuff here
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Remove an EV from the fleet
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    // Do stuff here
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
