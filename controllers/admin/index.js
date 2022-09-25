const router = require("express").Router();
const adminRoutes = require("./adminRoutes");

router.use("/", adminRoutes);

module.exports = router;
