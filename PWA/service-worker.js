importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
const VER = "v0.01"
const VER_NAME = "NEWSREPORT"+VER
const APP_STATIC = [
    "/",
    "/icons/manifest-icon-512.maskable.png",
    "/pages/news.html",
    "/pages/sports.html",
    "/pages/weather.html",
    "/scripts/newsReport.js",
    "/scripts/sportsReport.js",
    "/scripts/weatherReport.js",
    "/style/global.css",
    "/style/newsPage.css",
    "/style/sportsPage.css",
    "/style/weatherPage.css",
    "app.js",
    "index.html",
    "Logo.png",
    "minifest.json"
]

const instalButton = document.getElementById("instal")

instalButton.addEventListener("click", instal)

self.addEventListener("install", instal)

function instal(event){
    event.waitUntil(
        (async () => {
          const cache = await caches.open(CACHE_NAME)
          cache.addAll(APP_STATIC)
        })(),
    )
}

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
        const names = await caches.keys()
        await Promise.all(
            names.map((name) => {
            if (name !== CACHE_NAME) {
                return caches.delete(name)
            }
            }),
        )
        await clients.claim()
        })(),
    )
})
  

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
)