function fetchWeatherData(location) {
    fetch(`http://api.weatherstack.com/current?access_key=97d15e7c90db23a58c0bc6437a507d1f&query=${location}`)
        .then(res=>res.json())
        .then(displayWeather)
}

function displayWeather(response) {
    // https://weatherstack.com/documentation <-- for API documention
    const weatherData = response["current"]
    const dataContainer = document.getElementById("weatherDataContainer")
    dataContainer.innerHTML += `
        <div class="locationSpecificDataContainer spaceTopways">
            <div class="topHalf">
                <div class="iconContainer spaceSideways">
                    <img class="weatherIcon" src="${weatherData["weather_icons"]}" alt="Icon that indicates the current weather status">
                </div>
                <div class="tempContainer spaceSideways">
                    <h3 class="font  spaceSideways white center">
                        ${weatherData["temperature"]}
                    </h3>
                </div>
                <div class="timeAndDescriptionContainer spaceSideways">
                    <h3 class="font spaceSideways white center">
                        ${weatherData["observation_time"]}
                    </h3>
                    <h2 class="font spaceSideways white center">
                        ${weatherData["weather_descriptions"]}
                    </h2>
                </div>
            </div>
            <div class="bottomHalf">
                <table>
                    <tr>
                        <th class="font white center">
                            Wind Speed
                        </th>
                        <th class="font white center">
                            Wind Direction
                        </th>
                        <th class="font white center">
                            Precipitation
                        </th>
                        <th class="font white center">
                            Humidity
                        </th>
                        <th class="font white center">
                            Feels Like
                        </th>
                    </tr>
                    <tr>
                        <td class="font white center">
                            ${weatherData["wind_speed"]}
                        </td>
                        <td class="font white center">
                            ${weatherData["wind_dir"]}
                        </td>
                        <td class="font white center">
                            ${weatherData["precip"]}
                        </td>
                        <td class="font white center">
                            ${weatherData["humidity"]}
                        </td>
                        <td class="font white center">
                            ${weatherData["feelslike"]}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `
}

const locations = [59718, 59714, 59716]
locations.forEach(function(location) {
    fetchWeatherData(location)
})


