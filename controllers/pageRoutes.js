const router = require("express").Router();
const {
  User,
  Trip,
  UserProfile,
  Fleet,
  ElectricVehicle,
} = require("../models");
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
    let userStartAddress = "Denver, CO"; // default
    let data = await UserProfile.findOne({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["address"],
    });
    if (data) {
      const userProfile = data.get({ plain: true });
      userStartAddress = userProfile.address;
    }

    data = await Fleet.findAll({
      include: [
        {
          model: ElectricVehicle,
          attributes: ["id", "model_year", "manufacturer_name", "model"],
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });

    let vehicles = [];
    if (data) {
      vehicles = data.map((ev) => ev.get({ plain: true }));
    } else {
      data = await ElectricVehicle.findAll({
        attributes: ["id", "model_year", "manufacturer_name", "model"],
      });
      vehicles = data.map((ev) => ev.get({ plain: true }));
    }

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

// GET Map page
router.get("/map/:id", isAuthenticated, async (req, res) => {
  try {
    let data = await Trip.findByPk(req.params.id);

    const trip = data.get({ plain: true });

    data = await Fleet.findAll({
      include: [
        {
          model: ElectricVehicle,
          attributes: ["id", "model_year", "manufacturer_name", "model"],
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });

    let vehicles = [];
    if (data) {
      vehicles = data.map((ev) => ev.get({ plain: true }));
    } else {
      data = await ElectricVehicle.findAll({
        attributes: ["id", "model_year", "manufacturer_name", "model"],
      });
      vehicles = data.map((ev) => ev.get({ plain: true }));
    }

    res.render("map", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_id: req.session.user_id,
      vehicles,
      trip,
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
