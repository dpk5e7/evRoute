const router = require("express").Router();
const { Fleet } = require("../../models");
const { ElectricVehicle } = require("../../models")
const isAuthenticated = require("../../utils/auth");

// Insert a new Fleet Item
router.post("/", isAuthenticated, async (req, res) => {
  try {
    // Do stuff here
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});
// ! what is the path (url) to get to this point????  local3001/controller/api/fleetroutes
router.get("/", isAuthenticated, async (req, res) => {
  try {
   const selectObj = await ElectricVehicle.findAll({
    attributes: ["model_year", "manufacturer_name", "model"]
   });
   res.render('addEV', { 
    selectObj, 
    logged_in: req.session.logged_in 
  // res.json(selectObj)
  });
  console.log(selectObj)
  } catch (err) {

      res.status(420).json(err)
  }
});

// Remove an EV from the fleet
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    // Do stuff here
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
