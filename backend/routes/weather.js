const express = require("express");
const router = express.Router();
const axios = require("axios");
const Weather = require("../models/Weather");

const API_KEY = "4e36c1c9cc71465eabf144928260305";

// GET weather + save to DB
router.get("/:city", async (req, res) => {
    try {
        const city = req.params.city;

       const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

        const response = await axios.get(url);

        const data = response.data;

        const weatherData = {
          city: data.location.name,
          temperature: data.current.temp_c,
          humidity: data.current.humidity,
          description: data.current.condition.text
        };
    

        // save in MongoDB
        const newWeather = new Weather(weatherData);
        await newWeather.save();

        res.json(weatherData);

    } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

// GET history
router.get("/", async (req, res) => {
    const history = await Weather.find().sort({ date: -1 });
    res.json(history);
});

module.exports = router;