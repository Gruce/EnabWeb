const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('order-queue', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});


workbox.routing.registerRoute(
    // /https:\/\/pos\.itourstory\.com\/api\/supermarket\/orderStore/,
    /http:\/\/localhost:8000\/api\/supermarket\/+/,
    new workbox.strategies.NetworkOnly ({
        cacheName: 'web-pages',
        plugins: [
            bgSyncPlugin,
        ],
        matchOptions: {
            ignoreSearch: true,
            ignoreVary: true
        }
    }),
    'POST'
);