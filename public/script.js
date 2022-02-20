const serverUrl = "https://cafe-casavista.herokuapp.com";

const publicKey =
  "BJfYhfRnG2lq0M_u7fEspMRRsadMC03adMYmjyOcm63hj2uFhjrxsWMoXMYUdW5SJcmtJKZKoVJH3SkNymwJx24";

// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("sworker.js", {
    scope: "/",
  });
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });
  // console.log(subscription, "SUBBB");
  console.log("Push Registered...");

  // Send Push Notification
  // console.log("Sending Push...");
  await fetch(`${serverUrl}/push/admin-subscribe`, {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  // console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("sworker.js")
//     .then((registration) => {
//       console.log("Service Worker registered");
//     })
//     .catch((err) => {
//       console.log(err);
//       console.log("Service Worker Error");
//     });
// } else {
//   console.log("Service worker is not working");
// }
