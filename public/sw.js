/* eslint-disable */

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const CACHE_NAME = "offline-cache";
const OFFLINE_URL = "/offline-mode.png";

// Logic for caching offline assets
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        OFFLINE_URL,
        // Add any other assets you want to cache here
      ]);
    })
  );
});

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

let firebaseConfig = {};
let messaging; // Declare it here but initialize it later

self.addEventListener("notificationclick", (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  // The data from the notification:
  const courseId =
    clickedNotification.data && clickedNotification.data.courseId;

  // Check if courseId exists, if not redirect to academy URL
  const targetUrl = courseId ? `/course/?course_id=${courseId}` : "/academy";

  clients.openWindow(targetUrl);
});

// self.addEventListener('push', function(event) {
//   var payload = event.data ? event.data.json() : {};
//   console.log(payload);
//
//   var options = {
//     body: payload.notification.body || 'Conventa Reminder!',
//     icon: payload.notification.image,
//     image: payload.notification.image,
//     // other options like icon, image, actions, etc.
//   };
//
//   event.waitUntil(
//       self.registration.showNotification(payload.notification.title || 'Conventa', options)
//   );
// });

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SET_FIREBASE_CONFIG") {
    firebaseConfig = event.data.config;
    firebase.initializeApp(firebaseConfig || defaultConfig);
    console.log("initialized firebase");

    // Now that Firebase is initialized, we can set up messaging
    messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
      console.log("Received background message ", payload);

      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body || "Conventa Reminder!",
        icon: payload.notification.image,
        image: payload.notification.image,
      };

      self.registration
        .showNotification(notificationTitle, notificationOptions)
        .then((res) => {
          console.log("notification sent", res);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    });
  }
});
