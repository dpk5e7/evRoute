const router = require("express").Router();
const { User, Trip } = require("../../models");
const isAuthenticated = require("../../utils/auth");

// Delete a single trip
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const data = await Trip.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!data) {
      res.status(404).json({ message: "You don't have a trip with this id!" });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Save a trip
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const data = await Trip.create({
      title: req.body.title,
      source_address: req.body.source_address,
      destination_address: req.body.destination_address,
      is_aggressive: req.body.is_aggressive,
      user_id: req.body.user_id,
      electric_vehicle_id: req.body.electric_vehicle_id,
    });

    if (!data) {
      res.status(404).json(data);
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a trip
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const data = await Trip.update(
      {
        title: req.body.title,
        source_address: req.body.source_address,
        destination_address: req.body.destination_address,
        is_aggressive: req.body.is_aggressive,
        user_id: req.body.user_id,
        electric_vehicle_id: req.body.electric_vehicle_id,
      },
      {
        where: {
          id: req.params.id,
        },
        individualHooks: true,
      }
    );

    if (!data) {
      res.status(404).json({ message: "Failed to update trip!" });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
