const router = require("express").Router();
const { application } = require("express");
const { User, UserProfile } = require("../../models");
const isAuthenticated = require("../../utils/auth");

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// Get the user's profile
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const profileData = await UserProfile.findByPk({
      include: [{ model: User }],
    });
    res.status(200).json(profileData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create the user's profile
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const profileData = await UserProfile.create(req.body);
    res.status(200).json(profileData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//post recent addresses
router.post("/", (req, res) => {
  if (!req.session.address) {
    req.session.address.push(req.body);
  } else {
    req.session.address = [req.body];
    res.render("profile", req.session);
  }
});

// Update the user's profile
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const profileData = await UserProfile.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(profileData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
