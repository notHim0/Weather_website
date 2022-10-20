const request = require('request');

function geocode(address, callback) {
	const url =
		'http://api.positionstack.com/v1/forward?access_key=d0025bd1a9f8126980f14fb77c761627&query=' +
		encodeURIComponent(address) +
		'&limit=1';

	request({ url, json: true }, (error, { body }) => {
		if (error) callback('Unable to connect to location services, please restart your connection.', undefined);
		else if (body.error) callback('Invalid location, please try again.', undefined);
		else {
			const location = body.data[0];

			callback(error, {
				latitude  : location.latitude,
				longitude : location.longitude,
				location  : location.label
			});
		}
	});
}

module.exports = geocode;
