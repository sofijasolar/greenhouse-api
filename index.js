require('dotenv').config();

const express = require("express");
const axios = require("axios");
const app = express();
const morgan = require("morgan");
const sensorData = require("./routes/sensor-data");
const cors = require("cors");
const DataModel = require("./models/sensor-data-model");

const port = process.env.PORT || 3001;

// set up connection to MongoDB
const mongoose = require("mongoose");
mongoose.set('strictQuery', true); //Mongoose only retrieves fields that are explicitly selected
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected to database"))
    .catch((error)=> console.error("Error:", error));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/sensor-data", sensorData);
//app.use("api/sensor-data", sensorData);


app.get("/", function (req, res) {
    // Provide a basic HTML page on the root of the server
    res.write("<!DOCTYPE html>");
    res.write("<html style='font-family: Roboto, Arial, sans-serif;'>");
    res.write("<head><title>REST API - Greenhouse</title></head>");
    res.write("<body><p>/sensor-data to see data</p></body>");
    res.write("</html>");
    res.end();
  });

// mqtt connection
const mqtt = require('mqtt');
const topic = "greenhouseData/id:1";
const options = { username: process.env.MQTT_USERNAME, password: process.env.MQTT_PASSWORD};
const client  = mqtt.connect(process.env.MQTT_SERVER, options);


client.on('connect', function () {
  client.subscribe(topic , function (err) {
    if (!err) {
      client.publish(topic +"/", 'Subscription successful')
      console.log("Subscription successful");
    }
  })
})

client.on('message', async function (topic, message) {
  // message is Buffer
  console.log(message.toString())
    // remember error handling !!
    const data = JSON.parse(message.toString());
    const dataInstance = new DataModel(data);
    const saveResult = await dataInstance.save();
  

})
// background job to clean-up data older than 24 hours
const cron = require("node-cron");
const cleanupData = require("./backgroundJobs/dataCleanup");

// Schedule the cron job to run every day at 1 AM
cron.schedule("0 1 * * *", () => {
  cleanupData();
});


app.listen(port, function () {
    console.log(`app running on port ${port}`);
});