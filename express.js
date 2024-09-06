const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle weather requests
app.get("/weather", function (req, res) {
  const cityName = req.query.city;
  const apiKey = '6c2ac87614d4e72bd9888c7c60d3a91a'; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  https.get(url, function (response) {
    let data = '';

    response.on('data', chunk => data += chunk);

    response.on('end', () => {
      const weatherData = JSON.parse(data);
      if (weatherData.cod === '404') {
        res.json({ error: 'City not found' });
      } else {
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        res.json({
          name: weatherData.name,
          temp: temp,
          iconURL: imageURL
        });
      }
    });
  }).on('error', (e) => {
    console.error(e);
    res.json({ error: 'Error fetching weather data' });
  });
});

app.listen(3200, () => console.log("Server running on port 3200"));
