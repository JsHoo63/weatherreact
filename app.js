const express = require('express');
const app = express();
const axios = require('axios');
const Movie = require('./Weather');

const apikey = 'e79e86ac6e231089e7ee3cf9c4d42e03';

//localhost:5000/getmovie?title=MovieTitle
app.get('/getweather', (req, res) => {
  const location = req.query.title;
  const querystr = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`;

  axios
    .get(querystr)
    .then(response => {
      const weather = new Weather({
        location: location,
        country: response.data.sys.country,
        mainweather: response.data.weather[0].main,
        decription: response.data.weather.description,
        temp: response.data.main.temp,
        name: response.data.name,
        icon: response.data.weather[0].icon
      });
      if (!weather.location)  {
        res.status(200).json('Not found');
        return;
      }
      weather
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/getallweather
app.get('/getAllWeathers', (req, res) => {
  Weather.find({})
    .sort([['_id', -1]])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/deletemovie?title=MovieTitle
app.get('/deleteweather', (req, res) => {
  Weather.deleteOne({ location: req.query.location })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
