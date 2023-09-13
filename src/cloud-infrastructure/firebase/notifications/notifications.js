import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
import { firebaseConfig, firestore, messaging } from "../firebase";

const LOCAL_STORAGE_KEY = "userNotificationToken";

function getTokenFromLocalStorage() {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}

function setTokenToLocalStorage(token) {
  localStorage.setItem(LOCAL_STORAGE_KEY, token);
}

async function removeUserNotificationToken(userId, token) {
  const tokenDocRef = doc(
    collection(firestore, `notifications/${userId}/tokens`),
    token
  );

  try {
    await deleteDoc(tokenDocRef);
    console.log("Token removed from Firestore.");
  } catch (error) {
    console.error("Failed to remove token: ", error);
  }
}

export async function addUserNotificationToken(userId, currentToken) {
  const oldToken = getTokenFromLocalStorage();

  // If an old token exists, remove it from Firestore
  if (oldToken) {
    await removeUserNotificationToken(userId, oldToken);
  }

  // Save the new token to Firestore
  const tokenDocRef = doc(
    collection(firestore, `notifications/${userId}/tokens`),
    currentToken
  );
  await setDoc(tokenDocRef, {
    token: currentToken,
    timestamp: new Date().getTime(),
  });

  // Save the new token to local storage
  setTokenToLocalStorage(currentToken);
}
//
// export const getOrRegisterServiceWorker = () => {
//   if ("serviceWorker" in navigator) {
//     console.log("Registering a service worker!");
//     return window.navigator.serviceWorker
//       .getRegistration("/notifications-push-notification-scope")
//       .then((serviceWorker) => {
//         console.log("Registered service worker", serviceWorker);
//         if (serviceWorker) return serviceWorker;
//         const firebaseConfigParams = new URLSearchParams(
//           firebaseConfig
//         ).toString();
//         return window.navigator.serviceWorker.register(
//           `/firebase-messaging-sw.js?firebaseConfig=${firebaseConfigParams}`,
//           {
//             scope: "/",
//           }
//         );
//       });
//   }
//   throw new Error("The browser doesn`t support service worker.");
// };

export const getOrRegisterServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    console.log("Attempting to register a service worker!");

    return window.navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("Service worker registered!");

        // Check if the service worker became active.
        if (registration.active) {
          registration.active.postMessage({
            type: "SET_FIREBASE_CONFIG",
            config: firebaseConfig,
          });
        } else {
          // If the registration has a waiting service worker, then it's in the middle of an update.
          // We can wait for an update to finish by listening for the "statechange" event.
          registration.waiting.onstatechange = function () {
            if (this.state === "activated") {
              registration.active.postMessage({
                type: "SET_FIREBASE_CONFIG",
                config: firebaseConfig,
              });
            }
          };
        }
        return registration;
      })
      .catch((error) => {
        console.error("Service worker registration failed:", error);
        throw new Error("Service worker registration failed");
      });
  } else {
    throw new Error("The browser doesn't support service workers.");
  }
};

export async function updateUserNotificationToken(
  userId,
  successCallback,
  failed_callback
) {
  getOrRegisterServiceWorker().then((serviceWorkerRegistration) => {
    getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
      serviceWorkerRegistration,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("Updating the notifications entry");
          addUserNotificationToken(userId, currentToken)
            .then((_) => {
              successCallback();
            })
            .catch((err) => {
              failed_callback(err);
              console.error(err);
            });
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          successCallback();
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        successCallback();
      });
  });
}

export const getMessagingToken = async () => {
  return await messaging.getToken();
};

export const removeToken = async (uid, currentToken) => {
  const tokenDocRef = doc(
    collection(firestore, `notifications/${uid}/tokens`),
    currentToken
  );
  await deleteDoc(tokenDocRef);
};

export const onMessageListener = (handleMessage) => {
  return onMessage(messaging, (payload) => {
    handleMessage(payload);
    console.log("messages", payload);
  });
};
