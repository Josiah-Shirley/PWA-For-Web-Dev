//API Docs: https://www.thenewsapi.com/documentation

fetch('https://api.thenewsapi.com/v1/news/top?api_token=A94CCscceuleStvzHCncmcWqn8B25vq1VFCKS97X&locale=us&limit=3')
            .then(res=>res.json())
            .then(displayNews)

function displayNews(response) {
    //alert(response["data"][0]["title"])
    const newsStories = response["data"]
    const newsContainer = document.getElementById("newsStoriesContainer")
    for (let i=0; i<6; i++) {
        newsContainer.innerHTML += `
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