const router = require("express").Router();
const { ElectricVehicle, User } = require("../../models");
const isAdmin = require("../../utils/admin");

// GET homepage
router.get("/", isAdmin, async (req, res) => {
  try {
    res.render("admin", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_name: req.session.user_name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET edit user page
router.get("/editUser/:id", isAdmin, async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id);
    const user = data.get({ plain: true });

    res.render("editUser", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_name: req.session.user_name,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/deleteUser/:id", isAdmin, async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id);

    const user = data.get({ plain: true });

    res.render("deleteUser", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_name: req.session.user_name,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET admin users page
router.get("/users", isAdmin, async (req, res) => {
  try {
    const data = await User.findAll();
    const users = data.map((user) => user.get({ plain: true }));

    res.render("adminUsers", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_name: req.session.user_name,
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the admin ev page
router.get("/ev", isAdmin, async (req, res) => {
  try {
    const data = await ElectricVehicle.findAll({
      order: [
        ["model_year", "DESC"],
        ["manufacturer_name", "DESC"],
        ["model", "ASC"],
      ],
    });

    const vehicles = data.map((ev) => ev.get({ plain: true }));

    res.render("adminEV", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      user_name: req.session.user_name,
      vehicles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
