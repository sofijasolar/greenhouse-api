const express = require("express");
const router = express.Router();
const DataModel = require("../models/sensor-data-model");


// saves to database,, i dont think i need it??
router.post("/", async function (req, res, next) {
  console.log("req.body: ", req.body);
  try {
    const dataInstance = new DataModel({
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      illuminance: req.body.illuminance,
      //time: Date.now() //do i need this?
    });
    const saveResult = await dataInstance.save();
    res.status(201).json(saveResult);
  } catch (error) {
    res.status(500).json(error);
  }
});

//
router.get("/", async function (req, res) {
    const data = await DataModel.find().sort({ modifiedDate: -1 });
    res.status(200).json(data);
  });

module.exports = router;