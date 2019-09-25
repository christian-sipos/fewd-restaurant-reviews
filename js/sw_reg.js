// register service worker
if(navigator.serviceWorker)
  navigator.serviceWorker.register('sw.js').then(function() {
    console.log("Service Worker registration succesfull");
  }).catch(function() {
    console.log("Service Worker registration failed");
  });
