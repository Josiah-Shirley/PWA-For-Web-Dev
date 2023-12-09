//API Docs: https://www.thenewsapi.com/documentation
/*
fetch('https://api.thenewsapi.com/v1/news/top?api_token=A94CCscceuleStvzHCncmcWqn8B25vq1VFCKS97X&locale=us&limit=3')
    .then(res=>res.json())
    .then(displayNews)
*/

function displayNews(story) {
    
    const newsContainer = document.getElementById("newsStoriesContainer")
    newsContainer.innerHTML = story
    
}