# Greenhouse Monitoring Backend

This is the backend server for Greenhouse Monitoring. It provides REST API endpoints for managing sensor data and connects to an MQTT broker to receive real-time data from the greenhouse.

## Prerequisites

Before running the server, make sure you have the following set up:

1. Node.js and npm installed.
2. MongoDB installed and configured (update the `.env` file with your MongoDB URI).
3. MQTT broker accessible with the necessary credentials (update the `.env` file with MQTT details).

## Installation and Usage

## 1. Install dependencies
```npm install```

## 2. Set up environment variables:
Create a .env file in the root directory and add the following variables:
```
MONGO_URI="your-mongodb-uri"
MQTT_USERNAME="mqtt-username"
MQTT_PASSWORD="mqtt-password"
MQTT_SERVER="mqtt-server-url"
```

## 3. Start the server 
```npm start```


The server should now be running on port 3001. You can access the REST API and MQTT data using the provided endpoints.

## API Endpoints

- /sensor-data: API endpoints for managing sensor data.



