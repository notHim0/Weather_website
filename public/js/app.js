console.log('Ready to fetch data!');

const weatherForm = document.getElementById('form');
const search = document.getElementById('input');
const weather = document.getElementById('weather');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	weather.innerText = 'Loading....';
	const location = '/weather?address=' + search.value;

	fetch(location).then((response) => {
		response.json().then((data) => {
			if (data.error) return (weather.innerText = data.error);

			weather.innerText = data.location + '\n' + data.forcast;
		});
	});
});
