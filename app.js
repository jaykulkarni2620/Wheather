document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const cityName = document.getElementById('cityInput').value;
    fetch(`/weather?city=${encodeURIComponent(cityName)}`)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            if (data.error) {
                weatherResult.innerHTML = `<p>${data.error}</p>`;
            } else {
                weatherResult.innerHTML = `
                    <h2>Weather in ${data.name}</h2>
                    <p>Temperature: ${data.temp} °C</p>
                    <img src="${data.iconURL}" alt="Weather icon">
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
