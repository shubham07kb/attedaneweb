const cacheName = 'v1';
const cacheAssets = [
    '/',
    '/app.js',
    '/favicon.ico'
];
self.addEventListener('install', e => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache=>{
                cache.addAll(cacheAssets);
            })
            .then(() => { self.skipWaiting(); console.log('installed') })
    );
});
self.addEventListener('activate', e=>{
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName) {
                        console.log('Service Worker Clearing Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
self.addEventListener('fetch', e => {
    e.respondWith(fetch(e.request).catch(()=>cacheAssets.match(e.request)));
});