//GEO LOCATE
let lat, lon
if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition( async position => {

        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat, lon);
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
            const api_url = `weather/${lat},${lon}`;
            const response = await fetch(api_url);
            const json = await response.json();

            weather = json.weather;
            document.getElementById('summary').textContent = weather.weather[0].description;
            document.getElementById('temp').textContent = weather.main.temp;
            document.getElementById('city').textContent = weather.name;
            console.log(json);

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
