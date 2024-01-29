// MAKE SURE SERVICE WORKERS ARE SUPPORTED
if (navigator.serviceWorker) {
  console.log('SERVICE WORKER IS AVAILABE')

  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('../sw_cached_site.js')
      console.log('Service Worker Registered')
    } catch (error) {
      console.log(`Service Worker Error: ${error}`)
    }
  })
}
