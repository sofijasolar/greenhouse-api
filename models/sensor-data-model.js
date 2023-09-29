const mongoose = require("mongoose");
mongoose.set('strictQuery', true);  

const dataSchema = mongoose.Schema({
    temperature: {type: Number, required: true },
    humidity: {type: Number, required: true },
    illuminance: {type: Number, required: true },
    time: {type:Date, default: Date.now }
}, { collection: 'sensor_data' });

module.exports = mongoose.model("Data", dataSchema);
