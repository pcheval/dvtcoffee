self.addEventListener('install', (installEvent) => {
    installEvent.waitUntil(
        caches.open('dev-coffee-v1').then((cache) => {
            cache.addAll(['/','index.html','/css/style.css','/js/app.js','/images/coffee1.jpg','/images/coffee2.jpg','/images/coffee3.jpg'])
        })
    )
})


self.addEventListener('fetch', (event) => {
    if(!(event.request.url.indexOf('http') === 0)) return;
    
    console.log(event.request);
    event.respondWith(
        caches.match(event.request).then((cachedResource) => {
            if(cachedResource){
                return cachedResource
            }
            return fetch(event.request).then((Response) => {
                const responseToCache = Response.clone()
                caches.open('dev-coffee-v1').then((cache) => {
                    cache.put(event.request, responseToCache)
                })
                return Response
            })
        })
    )


})