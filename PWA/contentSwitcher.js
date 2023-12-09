document.addEventListener("DOMContentLoaded", function() {
    // Buttons (That are really div elements.)
    const homeButton = document.getElementById("homeContainer")
    const newsButton = document.getElementById("newsContainer")
    const weatherButton = document.getElementById("weatherContainer")
    const holidayButton = document.getElementById("holidayContainer")

    // Event listeners for the aforementioned buttons (That aren't really buttons.)
    homeButton.addEventListener('click', loadHomePage)
    newsButton.addEventListener('click', loadNewsPage)
    weatherButton.addEventListener('click', loadWeatherPage)
    holidayButton.addEventListener('click', loadHolidayPage)

    // This is the div that contains all of the page elements that are swicthed
    // in and out via the nav menu.
    const pageContentContainer = document.getElementById("pageContentContainer")

    // Each content block that can be loaded in and out has its own loading function
    // that is named with the convention: "load${name}page() {}""
    function loadHomePage() {

        pageContentContainer.innerHTML = `

        <div id="pageContentContainer">

        <div id="teamTitleContainer">
            <h2 id="ourTeam" class="blue font">Our Team</h2>
        </div>
    
        <div id="teamMembersContainer">
            <div id="caberContainer">
                <div class="bio">
                    <img class="headshot" src="images/caber.jpg" alt="Headshot of Caber">
                    <div class="bioText">
                        <h2 class="orange font">Caber Caldwell</h2>
                        <p class="blue font">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet iure tenetur perferendis sapiente veritatis expedita incidunt possimus dolor fugiat eaque ab itaque, ipsum eveniet dolorum, quod distinctio? Modi, architecto similique.</p>
                    </div>
                </div>
            </div>
            <div id="josiaContainer">
                <div class="bio">
                    <img class="headshot" src="images/josiah.jpg" alt="Headshot of Josiah">
                    <div class="bioText">
                        <h2 class="orange font">Josiah Shirley</h2>
                        <p class="blue font">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet iure tenetur perferendis sapiente veritatis expedita incidunt possimus dolor fugiat eaque ab itaque, ipsum eveniet dolorum, quod distinctio? Modi, architecto similique.</p>
                    </div>
                </div>   
            </div>
        </div>
    </div>
        
        `

    }

    // This function loads the news page
    function loadNewsPage() {

        //API Docs: https://www.thenewsapi.com/documentation

        fetch('https://api.thenewsapi.com/v1/news/top?api_token=A94CCscceuleStvzHCncmcWqn8B25vq1VFCKS97X&locale=us&limit=3')
                    .then(res=>res.json())
                    .then(displayNews)

        function displayNews(response) {
            //alert(response["data"][0]["title"])
            const newsStories = response["data"]
            pageContentContainer.innerHTML = ``
            for (let i=0; i<6; i++) {
                pageContentContainer.innerHTML += `
                <div class="storyContainer">
                    <div class="imageContainer">
                        <img class="newsStoryImage" src="${newsStories[i]["image_url"]}" alt="Image associated with news story">
                    </div>
                    <div class="titleAndContentContainer">
                        <div class="articleTitle">
                            <a href="${newsStories[i]["url"]}" target="_blank" class="storyLink font orange">${newsStories[i]["title"]}</a>
                            <p class="font white">${newsStories[i]["snippet"]}</p>
                        </div>
                    </div>
                </div>
                `
            }
        }

    }

    // I wonder what this function loads???
    function loadWeatherPage() {

            pageContentContainer.innerHTML = ``

            function fetchWeatherData(location) {
                fetch(`http://api.weatherstack.com/current?access_key=97d15e7c90db23a58c0bc6437a507d1f&query=${location}`)
                    .then(res=>res.json())
                    .then(displayWeather)
            }
            
            function displayWeather(response) {
                // https://weatherstack.com/documentation <-- for API documention
                const weatherData = response["current"]
                pageContentContainer.innerHTML += `
                    <style src="style/weatherPage.css"></style>
                    <div class="locationSpecificDataContainer spaceTopways">
                        <div class="topHalf">
                            <div class="iconContainer spaceSideways">
                                <img class="weatherIcon" src="${weatherData["weather_icons"]}" alt="Icon that indicates the current weather status">
                            </div>
                            <div class="tempContainer spaceSideways">
                                <h3 class="font  spaceSideways white center">
                                    ${((weatherData["temperature"]*(9/5))+32).toString() + "&deg;F"}
                                </h3>
                            </div>
                            <div class="timeAndDescriptionContainer spaceSideways">
                                <h3 class="font spaceSideways white center">
                                    ${response["location"]["localtime"]}
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
                                        ${weatherData["wind_speed"] + " MPH"}
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
                                        ${((weatherData["feelslike"]*(9/5))+32).toString() + "&deg;F"}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                `
            }


            navigator.geolocation.getCurrentPosition((position) => {
                var lat = position.coords.latitude 
                var lon = position.coords.longitude
                var location = lat.toString() + "," + lon.toString()
                fetchWeatherData(location);
            });



    }

    // This function was such a pain to make
    function loadHolidayPage() {

        // First, we need all the month names as well as how many days are in each month in order.
        const monthNames = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const monthLenghts =[31,28,31,30,31,30,31,31,30,31,30,31]
        pageContentContainer.innerHTML = ``
        
        for (let i = 0; i < monthNames.length; i++) {
            pageContentContainer.innerHTML += `
            <div class=monthContainer>
                <div class=""monthNameContainer">
                    <h2 class="monthName font blue">${monthNames[i]}</h2>
                </div>
                <div id="${monthNames[i]}" class="dayContainer">
                    <div class="week" id="week1${monthNames[i]}">

                    </div>
                    <div class="week" id="week2${monthNames[i]}">
                    
                    </div>
                    <div class="week" id="week3${monthNames[i]}">
                    
                    </div>
                    <div class="week" id="week4${monthNames[i]}">
                    
                    </div>
                    <div class="week" id="week5${monthNames[i]}">
                    
                    </div>
                </div>
            </div>
            `
            
            for (let j = 1; j <= monthLenghts[i]; j++) {
                if (j<8) {
                    week = document.getElementById("week1"+monthNames[i])
                } else if (j<15) {
                    week = document.getElementById("week2"+monthNames[i])
                } else if (j<22) {
                    week = document.getElementById("week3"+monthNames[i])
                } else if (j<29) {
                    week = document.getElementById("week4"+monthNames[i])
                } else {
                    week = document.getElementById("week5"+monthNames[i])
                }
                if (i<9) {
                    var monthString = "0"+(i+1).toString()
                } else {
                    var monthString = (i+1).toString()
                }
                if (j<10) {
                    var dayString = "0"+j.toString()
                } else {
                    var dayString = j.toString()
                }
                week.innerHTML += `
                    <div class="dateContainer">
                        <h2 id="2023-${monthString}-${dayString}" class="dateCode font blue">${dayString}</h2>
                    </div>
                `
            }
        }

        // documentation: https://rapidapi.com/theapiguy/api/public-holiday

        const url = 'https://public-holiday.p.rapidapi.com/2023/US';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3f7fb5cf29msh7dc7b57f9d09e28p17cef6jsn62966adbfec8',
                'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com'
            }
        };

        function addHolidays() {
            fetch(url, options)
                    .then(res=>res.json())
                    .then(displayHolidays)
        }
        addHolidays()

        function displayHolidays(response) {
            for (let i = 0; i < response.length; i++) {
                var date = response[i]["date"]
                var name = response[i]["name"]
                var day = document.getElementById(date)
                day.innerHTML += `
                <p class="font orange">${name}</p>
                `

            }
        }

    }





});