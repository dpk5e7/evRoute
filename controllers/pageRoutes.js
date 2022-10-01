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
    let data = await Fleet.findAll({
      include: [
        {
          model: ElectricVehicle,
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    let vehicles = [];
    if (data) {
      vehicles = data.map((ev) => ev.get({ plain: true }));
    }

    data = await Trip.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: ElectricVehicle,
          attributes: [
            "model_year",
            "manufacturer_name",
            "model",
            "photo_url",
            "manufacturer_url",
          ],
        },
      ],
    });
    let trips = [];
    if (data) {
      trips = data.map((trip) => trip.get({ plain: true }));
    }

    res.render("dashboard", {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      is_admin: req.session.is_admin,
      vehicles,
      trips,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET Trip page
router.get("/trip", isAuthenticated, async (req, res) => {
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

    res.render("trip", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
      userStartAddress,
      vehicles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET Map page
router.get("/trip/:id", isAuthenticated, async (req, res) => {
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

    res.render("trip", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
      vehicles,
      trip,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/deleteTrip/:id", isAuthenticated, async (req, res) => {
  try {
    const data = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: ElectricVehicle,
          attributes: ["model_year", "manufacturer_name", "model"],
        },
      ],
    });
    let trip = data.get({ plain: true });

    res.render("deleteTrip", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_name: req.session.user_name,
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
    const data = await UserProfile.findOne({
      where: { user_id: req.session.user_id },
    });

    let userProfile;
    if (data) {
      userProfile = data.get({ plain: true });
    }

    res.render("profile", {
      user_profile: userProfile,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_name: req.session.user_name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET addEV
router.get("/addEV", isAuthenticated, async (req, res) => {
  try {
    res.render("addEV", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_name: req.session.user_name,
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
      user_name: req.session.user_name,
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
