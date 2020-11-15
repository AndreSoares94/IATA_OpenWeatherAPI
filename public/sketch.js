
//GEO LOCATE
let lat, lon
if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition( async position => {

        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat, lon);
            const api_url = `weather/${lat},${lon}`;
            const response = await fetch(api_url);
            const json = await response.json();

            weather = json.weather;
            document.getElementById('summary').textContent = weather.weather[0].description;
            document.getElementById('temp').textContent = weather.main.temp;
            document.getElementById('city').textContent = weather.name;
            document.getElementById('speed').textContent = weather.wind.speed;
            document.getElementById('humidity').textContent = weather.main.humidity;
            console.log(json);

            var temp = weather.main.temp;

            //console.log(temp);

            if (temp > 35) {
              $('body').prepend('<div class="weather-warning"><p><span class="fa fa-sun-o"></span> High Temperature</p></div>');
            }

            $(document).ready(function(){

$('input[name="search-location"]').geocomplete({
	details: "form.searchform",
	detailsAttribute: "data-geo",
	types: ["geocode", "establishment"],
												   });

	$('input[name="search-location"]').geocomplete().bind("geocode:result", function(event, result){
    console.log(result['name']);

		$('input[name="street-address"]').val(result['name']);

  });
		});

            var iconPng = weather.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + iconPng + ".png";
            document.getElementById('icon1').src = iconUrl;
        } catch (error) {
            console.log('something went wrong');
        }

        const data = { lat, lon, weather};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const db_response = await fetch('/api', options);
        const db_json = await db_response.json();
        console.log(db_json);

    });
} else {
    console.log('geolocation not available');
}
