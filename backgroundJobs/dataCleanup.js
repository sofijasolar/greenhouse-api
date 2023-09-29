const mongoose = require("mongoose");
const DataModel = require("../models/sensor-data-model");

// needs fixing!

const cleanupData = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGO_URI);

    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Find and delete outdated data
    await DataModel.deleteMany({ time: { $lt: twentyFourHoursAgo } });

    console.log("Data cleanup completed successfully.");

    // Close the MongoDB connection
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error during data cleanup:", error);
  }
};

module.exports = cleanupData;
