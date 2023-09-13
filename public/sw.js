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
        body: payload.notification.body,
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
