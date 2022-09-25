const router = require("express").Router();
const { User, UserProfile } = require("../../models");
const isAuthenticated = require("../../utils/auth");

// Get the user's profile
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    // Do stuff here
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create the user's profile
router.post("/", isAuthenticated, async (req, res) => {
  try {
    // Do stuff here
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update the user's profile
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    // Do stuff here
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
