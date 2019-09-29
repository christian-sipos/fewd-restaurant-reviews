// set first part of cache name
var cacheStorage = 'rest-reviews-';
// create a number for each cache
var cacheNum = Math.round(Math.random() * 100) + 3;
// put together complete name if each cache
cacheStorage += cacheNum;

const filesToCache = [
    '/css/styles.css',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/sw_reg.js',
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

// react to install event: open cache and add files
self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(cacheStorage).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// react to acitvate event: get list of caches, filter for active cache,
// delete the other old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.filter(function(cacheName) {
                return cacheName.startsWith('rest-reviews-') &&
                       cacheName != cacheStorage;
            }).map(function(cacheName) {
                return caches.delete(cacheName);
            })
        );
    }));
});

// react to all fetch events
self.addEventListener('fetch', function(event) {
    // look in all caches if requests&response exists
    event.respondWith(caches.match(event.request).then(function(response) {
        // if found return the response data
        if (response) return response;
        // if no match, fetch response data from the network
        return fetch(event.request).then(function(response) {
            return caches.open(cacheStorage).then(function(cache) {
                cache.put(event.request.url, response.clone());
                return response;
            });
        });
    }));
});
