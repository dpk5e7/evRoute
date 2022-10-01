const router = require("express").Router();
const userRoutes = require("./userRoutes");
const nrelRoutes = require("./nrelRoutes");
const profileRoutes = require("./profileRoutes");
const tripRoutes = require("./tripRoutes");
const fleetRoutes = require("./fleetRoutes");
const evRoutes = require("./evRoutes");

router.use("/users", userRoutes);
router.use("/nrel", nrelRoutes);
router.use("/profile", profileRoutes);
router.use("/trips", tripRoutes);
router.use("/ev", evRoutes);
router.use("/fleet", fleetRoutes);

module.exports = router;
