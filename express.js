const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/hello", function (req, res) {
  res.send("hello world");
});

const url =
  "https://api.openweathermap.org/data/2.5/weather?q=india,mumbai&appid=6c2ac87614d4e72bd9888c7c60d3a91a&units=metric";
https.get(url, function (response) {
  console.log(response.statusCode);

  response.on("data", function (data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    console.log(weatherData);
    console.log(temp);
    console.log(icon);
  });
});
// res.send("the weather is ");

app.listen(3200, () => console.log("call on port 3200..."));
