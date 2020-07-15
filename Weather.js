const mongoose = require('mongoose');
const db = 'mongodb+srv://UserMongo_Test:mongo_Testing@cluster1-uvjsi.mongodb.net/Weather?retryWrites=true&w=majority';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  location: { type: String },
  country: { type: String },
  mainweather: { type: String },
  decription: { type: String },
  temp: { type: String },
  name: { type: String },
  icon: {type: String},
});

const Weather = mongoose.model('Weather', schema, 'weatherCollection');

module.exports = Weather;