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
  // delete where user id = session
  const profileData = await UserProfile.create({ user_id: req.session.user_id, address: req.body.address });

  res.status(200).json(profileData);
  } catch (err) {
    res.status(400).json(err);
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
