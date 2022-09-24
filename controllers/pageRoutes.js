const router = require("express").Router();
const isAuthenticated = require("../utils/auth");

// GET homepage
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET Map page
router.get("/map", isAuthenticated, async (req, res) => {
  try {
    res.render("map", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the change password page
router.get("/changePassword/", isAuthenticated, async (req, res) => {
  try {
    const data = await User.findByPk(req.session.user_id);

    const user = data.get({ plain: true });

    res.render("changePassword", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login page
router.get("/login", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/");
    } else {
      res.render("login", {
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create Account page
router.get("/createAccount", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/");
    } else {
      res.render("createAccount", {
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
