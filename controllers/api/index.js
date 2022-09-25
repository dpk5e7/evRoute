const router = require("express").Router();
const userRoutes = require("./userRoutes");
const nrelRoutes = require("./nrelRoutes");
const profileRoutes = require("./profileRoutes");

router.use("/users", userRoutes);
router.use("/nrel", nrelRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
