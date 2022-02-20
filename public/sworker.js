// console.log("Service Worker Loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  // console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: data?.icon,
    image: data?.media,
    url: data?.url,
    data: { url: data?.url },
    vibrate: [
      100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30,
      100,
    ],
  });
  navigator.vibrate([
    100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100,
  ]);
  const playSound = new Audio(
    "https://notificationsounds.com/storage/sounds/file-b8_discreet-song.mp3"
  );
  playSound.play();
  alert("NEW ORDER RECEIVED");
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

self.addEventListener("install", (e) => {
  // console.log("Service Worker Changed");
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll(["logo192.png"]);
    })
  );
});

self.addEventListener("fetch", function (event) {});

// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then((response) => {
//       return response || fetch(e.request);
//     })
//   );
// });
