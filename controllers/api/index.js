const router = require("express").Router();
const userRoutes = require("./userRoutes");
const nrelRoutes = require("./nrelRoutes");
const profileRoutes = require("./profileRoutes");
const tripRoutes = require("./tripRoutes");
const fleetRoutes = require("./fleetRoutes");

router.use("/users", userRoutes);
router.use("/nrel", nrelRoutes);
router.use("/profile", profileRoutes);
router.use("/trips", tripRoutes);
router.use("/fleetRoutes", fleetRoutes);

module.exports = router;
