// Function to check network connection
function isOnline() {
  return window.navigator.onLine;
}

// Function to update img src attribute based on network availability
function updateImgSrc() {
  const imgTags = document.getElementsByClassName("offline-caching-img");
  const placeholderSrc = "/offline-mode.png"; // Update with the path to your placeholder image

  for (let i = 0; i < imgTags.length; i++) {
    const imgTag = imgTags[i];
    const originalSrc = imgTag.getAttribute("data-original-src");

    if (isOnline()) {
      console.log("Network: Placeholder is available");
      // Set the original src if the network is available
      imgTag.src = originalSrc;
    } else {
      console.log("Network: Placeholder is unavailable");
      // Set the placeholder src if the network is unavailable
      imgTag.src = placeholderSrc;
    }
  }
}

// Function to handle the online/offline event
function handleNetworkChange() {
  if (isOnline()) {
    console.log("Network: Online");
    localStorage.setItem("lowPowerMode", "false");
  } else {
    console.log("Network: Offline");
    localStorage.setItem("lowPowerMode", "true");
  }

  updateImgSrc();
}

// Add event listener for online/offline events
window.addEventListener("online", handleNetworkChange);
window.addEventListener("offline", handleNetworkChange);

function checkLowPowerModePeriodically() {
  if (localStorage.getItem("lowPowerMode") === "true") {
    updateImgSrc();
  }
}

// Set interval to check low power mode periodically (every 5 seconds in this example)
setInterval(checkLowPowerModePeriodically, 5000); // 5000 milliseconds = 5 seconds

console.log("Offline caching script loaded");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`/sw.js`)
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (error) {
      console.log("Service Worker registration failed:", error);
    });
}
