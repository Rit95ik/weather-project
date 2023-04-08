const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use (bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {  
    res.sendFile(__dirname + "/index.html");
});

app.post("/",(req,res) => {
    
    const query = req.body.cityName;
    const unit = "metric";
    const apiKey = "2d31906cadf231c57e556375dbe250a3"
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid=" + apiKey ;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const image = weatherData.weather[0].icon;
      
      const imageURL = "http://openweathermap.org/img/wn/" + image + "@2x.png"
      console.log(temp);
      console.log(weatherDescription);

      res.write("<p>The weather is currently " + weatherDescription + "</P>");
      res.write("<img src="+imageURL+">")
      res.write("<h2>The tempereture of "+ query +" is " + temp + " degree celcius.</h2>");

      res.send();

      // const weatherStringify=JSON.stringify(weatherData)
      // console.log(weatherStringify);
    });
  });
})


app.listen(3000, () => {
  console.log("server is running on port 3000");
});
