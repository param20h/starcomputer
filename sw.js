// Service Worker for Star Computer Center
// Provides offline caching and performance improvements

const CACHE_NAME = 'star-computer-center-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/script-optimized.js',
    '/email-handler.js',
    '/email-config.js',
    '/tailwind-optimized.css',
    '/logo.png',
    '/images/IMG-20241102-WA0011.jpg',
    'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js',
    'https://cdn.tailwindcss.com'
];

// Install Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('✅ Service Worker: Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch events
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: Deleting old cache');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
