const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// call the API

const apiKey = process.env.API_KEY;

app.get('/', (req, res) => {
  axios
    .get(`https://api.ipgeolocation.io/timezone?apiKey=${apiKey}`)
    .then((response) => {
      console.log('response', response);
      console.log('response.data', response.data.geo.country_name);

      res.send(response.data); // Send the data property of the response
    })
    .catch((error) => {
      console.log('Error:', error.message);
      res.status(500).send('Internal Server Error'); // Sending a generic error response
    });
});
app.listen(3000, () => console.log('server started'));
