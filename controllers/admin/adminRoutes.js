const router = require("express").Router();
const isAdmin = require("../../utils/admin");

// GET homepage
router.get("/", isAdmin, async (req, res) => {
  try {
    res.render("admin", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET admin users page
router.get("/users", isAdmin, async (req, res) => {
  try {
    res.render("adminUsers", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the admin ev page
router.get("/ev", isAdmin, async (req, res) => {
  try {
    res.render("adminEV", {
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
