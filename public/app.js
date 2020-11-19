navigator.serviceWorker.register('/logger.sw.js').then((registration) => {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
});

const broadcast = new BroadcastChannel('mes-logger-channel');

broadcast.onmessage = (event) => {
    console.log(event.data);
};

// // Send first request
// broadcast.postMessage({
//     type: 'INCREASE_COUNT',
// });