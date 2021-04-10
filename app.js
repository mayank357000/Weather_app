//jshint esversion:6
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
 res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  // console.log(req.body.CityName);
  const query = req.body.CityName;
  const unit = "metric";
  const apiKey ="96400ca5cff7864346e64e5dc997b878";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;

  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdes = weatherdata.weather[0].description;
      const icon =weatherdata.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>the weather in "+query+" is " + weatherdes + ".</p>");
      res.write("<h1>The temperature in "+query+" is " + temp + " degree celcius.</h1>");
      res.write("<img src="+imageUrl+">");
      res.send();
    });
  });
});









app.listen(3000, function() {
  console.log("Server has started running on port 3000");
});
