const router = require("express").Router();
const userRoutes = require("./userRoutes");
const nrelRoutes = require("./nrelRoutes");

router.use("/users", userRoutes);
router.use("/nrel", nrelRoutes);

module.exports = router;
