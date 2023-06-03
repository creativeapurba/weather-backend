const express = require('express');
const body_parser = require('body-parser');
const https = require('node:https');
const api_id = "0581781fdefc3d7b7e63f800e43d2804";
const app = express();
app.use(body_parser.urlencoded({extended:true}));
const port = 4000;

app.get('/',(req,res)=>{
  res.sendFile(__dirname +'/index.html')

});
app.post('/',(req,res)=>{
  const searchString = req.body.city_name;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=${api_id}&units=metric`
  https.get(url,(response)=>{
    console.log(response.statusCode);
    response.on('data', (data) => {
        const weather = JSON.parse(data);
        console.log(weather);
        const temp = weather.main.temp;
        const city = weather.name;
        const weatherCondition = weather.weather[0].main
        const hum = weather.main.humidity;

        weatherData = {
            temperature:temp,
            cityName:city,
            weatherStatus: weatherCondition,
            humidity:hum
        }

        res.send(weatherData);
      });
  })
});   
    


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
// Build an express app which will take CITY NAME from the client side 
// and search the WEATHER for the concern CITY NAME.(Hint: Use openweather api, body-parser package)
