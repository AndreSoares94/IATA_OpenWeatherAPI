/** THIS IS THE SERVER, HOSTS STATIC FILES WHICH HAPPENS TO BE index.html
  * SAVE TO DATABASE
  * AUTHENTICATION
  */

// express is used to build web services, importing express:
const { request, response } = require('express');
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

//create app
const app = express();

// listen at port:
app.listen(3000, () => console.log('listening at 3000'));

/**
 * objetive: serve webpage: index.html that is the public folder
 */
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// Create and load database:
const database = new Datastore('database.db');
database.loadDatabase();

/** insert things in database:
 * database.insert({name: 'Andre', status: 'rainbow'});
 * database.insert({name: 'Soares', status: 'test'});
*/

/**
 * Setting up the GET
 */
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

/**
 * Setting up api to the client send data, he going to get the data (POST) in /api
 * request is what the client send us
 * response is our response to the client (sending back the info in json)
 */
app.post('/api', (request, response) => {
   const data = request.body;
   const timestamp = Date.now();
   data.timestamp = timestamp;
   database.insert(data);
   response.json(data);
});

app.get('/weather/:latlon', async (request, response) => {
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);

    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=54880c125693096ed43dc2fd0f5ceba4`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();


    const data = {
        weather: weather_data
    };
    response.json(data);
});