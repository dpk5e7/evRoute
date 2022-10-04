const router = require("express").Router();
const { ElectricVehicle } = require("../../models");
const isAuthenticated = require("../../utils/auth");

// Get an ev
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const data = await ElectricVehicle.findByPk(req.params.id);
    const ev = data.get({ plan: true });
    res.status(200).json(ev);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
