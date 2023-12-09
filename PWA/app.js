const refreshButton = document.getElementById("refresh")
const clearButton = document.getElementById("refresh")
const STORAGE_KEY = "newsWPA"
const BOOL_KEY = "hasSaved"

window.onload = (ev)=>{
    const has = window.localStorage.getItem(BOOL_KEY)
    if(!(has==1)){
        getText()
    }else{
        displayNews(pullData())
    }
}

clearButton.addEventListener("click", (e)=>{
    e.preventDefault()
    window.localStorage.clear()
})

refreshButton.addEventListener("click", (e) =>{
    e.preventDefault()
    getText()
})

async function getText(){
    fetch('https://api.thenewsapi.com/v1/news/top?api_token=A94CCscceuleStvzHCncmcWqn8B25vq1VFCKS97X&locale=us&limit=3')
    .then(res=>res.json())
    .then(pushData)
    /*
    let myObj = await fetch(file)
    let jsonOut = await myObj.json()
    return await jsonOut
    */
}

function pushData(response){
    var newsStory = response["data"]

    var str = ``
    for (let i=0; i<3; i++) {
        
        str += `
       <div class="storyContainer">
           <div class="imageContainer">
               <img class="newsStoryImage" src="${newsStory[i]["image_url"]}" alt="Image associated with news story">
           </div>
           <div class="titleAndContentContainer">
               <div class="articleTitle">
                   <a href="${newsStory[i]["url"]}" target="_blank" class="storyLink font orange">${newsStory[i]["title"]}</a>
                   <p class="font white">${newsStory[i]["snippet"]}</p>
               </div>
           </div>
       </div>
       `
   }

    window.localStorage.setItem(STORAGE_KEY, str)
    window.localStorage.setItem(BOOL_KEY, 1)

    displayNews(pullData())
}

function pullData(){
    const data = window.localStorage.getItem(STORAGE_KEY)
    const has = window.localStorage.getItem(BOOL_KEY)
    var story = has==1 ? data : ``
    console.log(data)
    console.log(has)
    return story
}