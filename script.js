// make sure service workers are supported

// navigator is basically the browser as an object
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('./sw_cached_pages.js')
            // returns promise with registration object
            .then(reg => console.log('service worker registered'))
            .catch(err => console.log(`Service worker: Error: ${error}`))
        })
}