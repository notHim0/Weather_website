const request = require('request');

function weather(latitude, longitude, callback) {
	const url =
		'http://api.weatherstack.com/current?access_key=8989b5307b72f96351dee3f5ab4fd3cd&query=' +
		latitude +
		',' +
		longitude;

	request({ url, json: true }, (error, { body }) => {
		if (error) callback('Unable to connect	 to Weather api', undefined);
		else if (body.error) callback('Invalid input', undefined);
		else {
			const data = body.current;
			callback(
				error,
				data.weather_descriptions[0] +
					'. It is currently ' +
					data.temperature +
					'°C outside and ' +
					data.feelslike +
					'°C inside.' +
					body.location.name +
					' currently has a approximated wind speed of ' +
					data.wind_speed +
					'km/h, humidity is at ' +
					data.humidity +
					'%.'
			);
		}
	});
}
module.exports = weather;
