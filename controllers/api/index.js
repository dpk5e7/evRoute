const router = require("express").Router();
const userRoutes = require("./userRoutes");
const nrelRoutes = require("./nrelRoutes");
const profileRoutes = require("./profileRoutes");
const tripRoutes = require("./tripRoutes");

router.use("/users", userRoutes);
router.use("/nrel", nrelRoutes);
router.use("/profile", profileRoutes);
router.use("/trips", tripRoutes);

module.exports = router;
