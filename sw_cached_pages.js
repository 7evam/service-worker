const cacheName = 'v2'
const cacheAssets = [
    'index.html',
    'about.html',
    'style.css',
    'script.js'
]

// call install event
self.addEventListener('install', (event) => {
    console.log(`service worker: installed`)
    // wait until promise is finished
    // this is precaching
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log(`Service Worker: Caching files`)
                cache.addAll(cacheAssets)
            })
            .then(()=>self.skipWaiting)
    )
    
})

self.addEventListener('fetch', event => {
    console.log('service worker: fetching')
    event.respondWith(
        fetch(event.request).catch(()=>caches.match(e.request))
    )
})

// call activate event
self.addEventListener('activate', event => {
    console.log(`Service Worker: Activated`)
    // remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: clearing old cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

