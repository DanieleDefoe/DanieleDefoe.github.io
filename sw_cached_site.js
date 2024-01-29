const cacheName = 'v2';

// Call Install Event
self.addEventListener('install', (event) => {
  console.log(`Service Worker Installed`)
})

// Call Activate Event (CLEAN UP OLD CACHE)
self.addEventListener('activate', (event) => {
  console.log(`Service Worker Activated`)
  // Remove unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((cache) => {
        if (cache !== cacheName) {
          console.log(`Service Worker Clearing Old Cache`)
          return caches.delete(cache)
        }
      }))
    })
  )
})

// Call fetch event
self.addEventListener('fetch', (event) => {
  console.log(`Service Worker Fetching`)

  event.respondWith(
    fetch(event.request)
      .then(res => {
        // Make copy of response
        const responseClone = res.clone()
        // Open cache
        caches.open(cacheName).then(cache => {
          // Add response to cache
          cache.put(event.request, responseClone)
        })

        return res
      })
      .catch(() => caches.match(event.request).then((res) => res))
  )
})
