const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const geoWeather = require('./utils/geoWeather');

//loading in the express function
const app = express();

//Define path for express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlers and Express config
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		tittle : 'Weather',
		name   : 'Shayan Tanweer'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		tittle      : 'Help',
		description : 'Hello there, how may I assist you today?',
		name        : 'Shayan Tanweer'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		tittle : 'About',
		name   : 'Shayan Tanweer'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'You must provide a search location' });
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		geoWeather(latitude, longitude, (error, locationData) => {
			if (error) {
				res.send({ error });
			}
			res.send({
				location,
				forcast  : locationData,
				address  : req.query.address
			});
		});
	});
});
app.get('/help/*', (req, res) => {
	res.render('error', {
		tittle      : 'error 404 page not found',
		description : 'Help page not found',
		name        : 'Shayan Tanweer'
	});
});
app.get('*', (req, res) => {
	res.render('error', {
		tittle      : 'error 404 page not found',
		description : 'page not found',
		name        : 'Shayan Tanweer'
	});
});
app.listen(3000, () => console.log('Server is up and running.....'));
