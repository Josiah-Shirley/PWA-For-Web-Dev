// BasketBall: https://rapidapi.com/api-sports/api/api-basketball/
const dataContainer = document.getElementById("sportsDataContainer")

function fetchSportsData() {
    fetch("https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason")
        .then(res=>res.json())
        .then(displayData)
}

function displayData(response) {
    alert(response)
}

fetchSportsData