var staticCacheName = 'restaurant-reviews-static-v';
var cacheId = Math.floor(Math.random() * 100) + 1;
staticCacheName += cacheId;

const urlsToCache = [
    '/css/styles.css',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/sw_register.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/index.html',
    '/restaurant.html'
];

// in the install callback,
// 1. open cache
// 2. add urls 
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(staticCacheName)
        .then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

// manage caches
self.addEventListener('activate', function(event){
    event.waitUntil(
        // get all cache names
        caches.keys().then(function(cacheNames){
            cacheNames.filter(function(cacheName) {
                // return cache
                 return cacheName.startsWith('restaurant-reviews-') && cacheName != staticCacheName;
            }).map(function(cacheName){
                // delete cache
                return caches.delete(cacheName);
            })
        })
    );
});


self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            // find data and return it
            if (response) {
                return response;
            }

            // no matching, fetch it from network
            return fetch(event.request).then(function(response){
                return caches.open(staticCacheName).then(function(cache){
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            });
        })
    );
});