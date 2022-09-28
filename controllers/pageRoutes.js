const router = require("express").Router();
const { User } = require("../models");
const isAuthenticated = require("../utils/auth");
const isNotAuthenticated = require("../utils/notAuth");

// GET login page (root)
router.get("/", isNotAuthenticated, async (req, res) => {
  try {
    res.render("login", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET dashboard
router.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
    res.render("dashboard", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET Map page
router.get("/map", isAuthenticated, async (req, res) => {
  try {
    // Need to get the user's default start address. This is test data.
    const userStartAddress = "Morrison, CO";

    // Need to get the user's fleet. This is test data.
    const vehicles = [
      {
        id: 20,
        model_year: "2022",
        manufacturer_name: "Ford",
        model: "F150 Lightning 4WD",
      },
      {
        id: 66,
        model_year: "2022",
        manufacturer_name: "Rivian",
        model: "R1S",
      },
      {
        id: 89,
        model_year: "2021",
        manufacturer_name: "BMW",
        model: "i3",
      },
    ];

    res.render("map", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_id: req.session.user_id,
      userStartAddress,
      vehicles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the user's profile page
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const data = await User.findByPk(req.session.user_id);

    const user = data.get({ plain: true });

    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the change password page
router.get("/changePassword", isAuthenticated, async (req, res) => {
  try {
    const data = await User.findByPk(req.session.user_id);

    const user = data.get({ plain: true });

    res.render("changePassword", {
      user,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create Account page
router.get("/createAccount", isNotAuthenticated, async (req, res) => {
  try {
    res.render("createAccount", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
