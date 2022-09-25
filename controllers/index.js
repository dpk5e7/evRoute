const router = require("express").Router();
const pageRoutes = require("./pageRoutes");
const apiRoutes = require("./api");
const adminRoutes = require("./admin");

router.use("/", pageRoutes);
router.use("/api", apiRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
