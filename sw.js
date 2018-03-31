var RESTAURANTS_CACHE_NAME = 'restaurant-cache';

var urlsToCache = [
    '/',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
];

/**
 * On installation, cache all required files
 */
self.addEventListener('install', function (event) {
    console.log('Event: SW Install');
    event.waitUntil(
        caches.open(RESTAURANTS_CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('Event: SW Fetch');
    event.respondWith(
        caches.match(event.request, {
            ignoreSearch: true
        }).then(response => {
            return response || fetch(event.request);
        })
        .catch(err => console.log(err, event.request))
    );
});