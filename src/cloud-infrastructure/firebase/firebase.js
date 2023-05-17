import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import axios from "axios";
import md5 from "../utils/md5";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

/* Initialise Firebase */
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

export default auth;

/* Session Constants */
const start_time = Date.now();
let ip = null;
let session_id = null;

const NUMBER_OF_NEGOTIATION_MINIGAMES = 1;

const PRICING_PLANS_MONTHLY = [
  "price_1MDtRwGME0Qq6U11kgSPpAMw", //HOBBYIST_MONTHLY
  "price_1MDtTUGME0Qq6U11XjxqzOiK", //AMATEUR_MONTHLY
  "price_1MDtUCGME0Qq6U11F6mX5pC6", //PRO_MONTHLY
];

const PRICING_PLANS_YEARLY = [
  "price_1MDtUcGME0Qq6U11AqbXxfeI", //HOBBYIST_YEARLY
  "price_1MDtTUGME0Qq6U1117YJzQol", //AMATEUR_YEARLY
  "price_1MDtUCGME0Qq6U11ol786qFy", //PRO_YEARLY
];

const setIP = (value) => {
  ip = value;
};

const setSessionID = (value) => {
  session_id = value;
};

const getData = async () => {
  const res = await axios.get("https://geolocation-db.com/json/");
  setIP(res.data.IPv4);
};

const getIP = () => {
  if (ip != null) {
    return ip;
  }
  getData().then(() => {
    return ip;
  });
};

const getSessionId = () => {
  if (session_id != null) {
    return session_id;
  }
  if (!ip) {
    const _ip = getIP();
    const _session_id = md5(String(start_time) + String(_ip));
    setSessionID(_session_id);
    return session_id;
  }
};

/* Authentication */
export async function createUserDoc(user_cred, name, email) {
  const userCollection = collection(firestore, "users");
  console.log(user_cred.user.uid);
  await setDoc(doc(userCollection, user_cred.user.uid), {
    name: name,
    email: email,
    subscription: "free",
    verification: "none",
    gems: 0,
  });
}

export async function createCheckoutSession(uid, plan_selected, isMonthly) {
  var price_id;
  if (isMonthly) {
    price_id = PRICING_PLANS_MONTHLY[plan_selected];
  } else {
    price_id = PRICING_PLANS_YEARLY[plan_selected];
  }
  // console.log(price_id, plan_selected * is_annual - 1);
  const sessionDocRef = await addDoc(
    collection(firestore, `users/${uid}/checkout_sessions`),
    {
      price: price_id,
      success_url: window.location.origin + "/academy",
      cancel_url: window.location.origin + "/pricing-page",
    }
  );

  onSnapshot(sessionDocRef, (snap) => {
    const { error, url } = snap.data();
    if (error) {
      // Show an error to your customer and
      // inspect your Cloud Function logs in the Firebase console.
      alert(`An error occured: ${error.message}`);
    }
    if (url) {
      // We have a Stripe Checkout URL, let's redirect.
      window.location.assign(url);
      // getStripe().then((stripe) => {
      //   stripe.redirectToCheckout({sessionId: session_id})
      // });
      // stripe.redirectToCheckout({session_id: session_id)
    }
  });
}

export async function getUserClaim() {
  await auth.currentUser.getIdToken(true);
  const decodedToken = await auth.currentUser.getIdTokenResult();
  if (decodedToken?.claims?.stripeRole) {
    return decodedToken.claims.stripeRole;
  } else {
    return "Upgrade!";
  }
}

/* User Information */
export async function userCompletedLesson(lesson_id) {
  const date = new Date();
  // Set time to 00:00:00
  date.setHours(0, 0, 0, 0);
  const activityDocRef = await addDoc(
    collection(firestore, `users/${auth.currentUser.uid}/activity`),
    {
      date: date.getTime(),
      lesson_id: lesson_id,
    }
  );
  return activityDocRef;
}

export async function getLessonsCompletedForDay(date) {
  date.setHours(0, 0, 0, 0);
  const userActivityRef = collection(
    firestore,
    `users/${auth.currentUser.uid}/activity`
  );
  const q = query(userActivityRef, where("date", "==", date.getTime()));
  const querySnapshot = await getDocs(q);
  let entries = 0;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    entries += 1;
  });
  return entries;
}

export async function userStreakForDay(date) {
  // Set time to 00:00:00
  const entries = await getLessonsCompletedForDay(date);
  return entries >= 5;
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

/* Gems */
export async function getUserGems() {
  // get user data
  const userDoc = doc(firestore, "users", auth.currentUser.uid);
  return getDoc(userDoc)
    .then((e) => {
      // console.log("user info", e.data())
      if ("gems" in e.data()) {
        return e.data()["gems"];
      } else {
        return 0;
      }
    })
    .catch((e) => {
      return 0;
    });
}

export async function addGemLog(pageId, numberOfGems, gemType) {
  const date = new Date();

  return await addDoc(
    collection(firestore, `users/${auth.currentUser.uid}/gems`),
    {
      date: date.getTime(),
      pageId: pageId,
      gems: numberOfGems,
      gemType: gemType,
    }
  );
}

export async function addGemsToUser(
  numberOfGems,
  pageId,
  gemType,
  successUpdate,
  failedUpdate
) {
  getUserGems().then((amount) => {
    const userDoc = doc(firestore, "users", auth.currentUser.uid);
    const newGems = amount + numberOfGems;
    Promise.all([
      updateDoc(userDoc, { gems: newGems }),
      addGemLog(pageId, numberOfGems, gemType),
    ])
      .then((_) => {
        successUpdate(`Added ${numberOfGems} gems. New Total: ${newGems}`);
      })
      .catch((e) => {
        failedUpdate(`Unable to add gems... Network Error...${e}`);
      });
  });
}

/* Lives */
export async function getLives() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const livesRef = collection(firestore, `users/${auth.currentUser.uid}/lives`);
  const q = query(livesRef, where("date", ">=", date.getTime()));
  const querySnapshot = await getDocs(q);
  let entries = 0;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    entries += 1;
  });
  return entries;
}

export async function lessonsLocked() {
  const response = await getUserClaim();
  if (response === "Upgrade!") {
    try {
      const lives = await getLives();
      return lives >= 3;
    } catch (e) {
      console.log("error", e);
    }
    console.log("here");
    return false;
  } else {
    return false;
  }
}

export async function lostLife(pageId, selectedOption) {
  const date = new Date();

  return await addDoc(
    collection(firestore, `users/${auth.currentUser.uid}/lives`),
    {
      date: date.getTime(),
      pageId: pageId,
      selectedOption: selectedOption,
    }
  );
}

/* Courses */
export async function getCourses() {
  const courseCollection = collection(firestore, "courses");
  const courseItems = await getDocs(courseCollection);
  const courses = courseItems.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return courses;
}

export async function getCourse(id) {
  const courseDoc = doc(firestore, "courses", id);
  const courseItems = await getDoc(courseDoc);
  return courseItems.data();
}

/* Lessons */
export async function getLesson(lesson_ref) {
  const lesson_id = lesson_ref.id;
  const lessonDoc = doc(firestore, "lessons", lesson_id);
  const lessonItems = await getDoc(lessonDoc);
  return { id: lesson_id, ...lessonItems.data() };
}

export async function getLessonFromID(lesson_id) {
  const lessonDoc = doc(firestore, "lessons", lesson_id);
  const lessonItems = await getDoc(lessonDoc);
  return { id: lesson_id, ...lessonItems.data() };
}

export async function getLessonsCompleted() {
  const userActivityRef = collection(
    firestore,
    `users/${auth.currentUser.uid}/activity`
  );
  const lessonActivity = query(userActivityRef, where("lesson_id", "!=", ""));
  const lessonCount = await getCountFromServer(lessonActivity);
  return lessonCount.data().count;
}

export async function hasUserCompletedLesson(lessonRef) {
  const userActivityRef = collection(
    firestore,
    `users/${auth.currentUser.uid}/activity`
  );
  const lessonActivity = query(
    userActivityRef,
    where("lesson_id", "==", lessonRef)
  );
  const lessonCount = await getCountFromServer(lessonActivity);
  return lessonCount.data().count > 0;
}

export async function getLessonToComplete(lessonRefs) {
  return Promise.all(
    lessonRefs.map((lessonRef) => {
      return hasUserCompletedLesson(lessonRef);
    })
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Unable to get Lessons to Complete", err);
      return [];
    });
}

/* Pages */
export async function getPageFromID(page_path) {
  const pageId = page_path.split("/")[1];
  const pageDoc = doc(firestore, "pages", page_path.split("/")[1]);
  const snapshot = await getDoc(pageDoc);
  const pageData = snapshot.data().page;
  // Slight formatting change goes here
  // {type: pageData.type, data: {}}
  let data;
  if (pageData.type === "text") {
    data = {
      id: pageId,
      type: pageData.type,
      content: pageData.data,
    };
  } else if (pageData.type === "question") {
    data = {
      id: pageId,
      type: pageData.type,
      content: {
        question: pageData.question,
        questions: pageData.questions,
        answer: parseInt(pageData.answer),
        explanation: pageData.explanation,
      },
    };
  } else if (pageData.type === "selection_image") {
    data = {
      id: pageId,
      type: pageData.type,
      content: {
        question: pageData.question,
        questions: pageData.questions,
        answer: parseInt(pageData.answer),
      },
    };
  } else if (pageData.type === "build_sentence") {
    data = {
      id: pageId,
      type: pageData.type,
      content: pageData.data,
    };
  } else if (pageData.type === "single_word") {
    data = {
      id: pageId,
      type: pageData.type,
      content: {
        sentence: pageData.sentence,
        word: pageData.word,
      },
    };
  } else if (pageData.type === "selection_text") {
    data = {
      id: pageId,
      type: pageData.type,
      content: {
        question: pageData.question,
        questions: pageData.questions,
        answer: parseInt(pageData.answer),
      },
    };
  } else if (pageData.type === "selection_image") {
    data = {
      id: pageId,
      type: pageData.type,
      question: pageData.question,
      questions: pageData.questions,
      answer: parseInt(pageData.answer),
    };
  } else if (pageData.type === "match_cards") {
    data = {
      id: pageId,
      type: pageData.type,
      content: {
        mapping: { ...pageData.mapping },
      },
    };
  } else if (pageData.type === "flip_and_select") {
    data = {
      id: pageId,
      type: pageData.type,
      content: {
        mapping: { ...pageData.mapping },
      },
    };
  } else if (pageData.type === "case_study") {
    data = {
      id: pageId,
      type: pageData.type,
      content: {
        story: pageData.story,
        title: pageData.title,
      },
    };
  } else if (pageData.type === "order_list") {
    data = {
      id: pageId,
      type: pageData.type,
      content: {
        question: pageData.question,
        correct_order: pageData.correct_order,
      },
    };
  } else if (pageData.type === "binary_classifier") {
    data = {
      id: pageId,
      type: pageData.type,
      content: {
        question: pageData.question,
        category_one: Object.keys(pageData.mapping)[0],
        category_two: Object.keys(pageData.mapping)[1],
        category_one_options:
          pageData.mapping[Object.keys(pageData.mapping)[0]],
        category_two_options:
          pageData.mapping[Object.keys(pageData.mapping)[1]],
      },
    };
  }
  return data;
}

/* Minigames*/

// Deception Detection
const NUMBER_OF_MINIGAMES = 4;

export async function getDeceptionItems(number_of_games) {
  const deceptionCollection = collection(firestore, "deception-detection");
  let qs = Array(number_of_games);
  for (let i = 0; i < number_of_games; ++i) {
    qs[i] = Math.floor(Math.random() * NUMBER_OF_MINIGAMES);
  }
  const deceptionQuery = query(deceptionCollection, where("index", "in", qs));
  const deceptionDocs = await getDocs(deceptionQuery);
  return deceptionDocs.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

/* Logging */
export function logCourseClicked(id, courseName) {
  logEvent(analytics, "select_course", {
    content_type: "course",
    content_id: id,
    content_name: courseName,
    items: JSON.stringify([
      {
        name: courseName,
        time: Date.now(),
        session: getSessionId(),
        ip: getIP(),
      },
    ]),
  });
}

export function logFirebaseEvent(event_name, information) {
  logEvent(analytics, event_name, {
    ...information,
  });
}

export function logAcademyStart() {
  logEvent(analytics, "browse_academy", {
    content_type: "webpage",
    items: [{ time: Date.now(), session: getSessionId(), ip: getIP() }],
  });
}

/* Negotiation Minigame */
export async function getNegotiationMinigameData() {
  const collectionRef = collection(firestore, "negotiation-minigame");
  const snapshot = await getDocs(collectionRef);

  console.log("here");

  if (NUMBER_OF_NEGOTIATION_MINIGAMES === 0) {
    throw new Error("No documents found in collection");
  }

  const randomIndex = Math.floor(
    Math.random() * NUMBER_OF_NEGOTIATION_MINIGAMES
  );
  const randomDoc = snapshot.docs[randomIndex];
  const data = { id: randomDoc.id, ...randomDoc.data() };

  return data;
}

/* Banner */
export async function getBanner() {
  const bannersRef = collection(firestore, "banner");
  const bannerItem = await getDocs(bannersRef);
  const banner = bannerItem.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return banner[0];
}

async function addUserNotificationToken(userId, currentToken) {
  // Add a document that gives the current token
  console.log("Updating notifications");
  return await setDoc(doc(collection(firestore, `notifications/`), userId), {
    notification_token: currentToken,
  });
}

export const getOrRegisterServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    console.log("Registering a service worker!");
    return window.navigator.serviceWorker
      .getRegistration("/firebase-push-notification-scope")
      .then((serviceWorker) => {
        console.log("Registered service worker", serviceWorker);
        if (serviceWorker) return serviceWorker;
        const firebaseConfigParams = new URLSearchParams(
          firebaseConfig
        ).toString();
        return window.navigator.serviceWorker.register(
          `/firebase-messaging-sw.js?firebaseConfig=${firebaseConfigParams}`,
          {
            scope: "/e-learning-template",
          }
        );
      });
  }
  throw new Error("The browser doesn`t support service worker.");
};

export async function updateUserNotificationToken(userId, successCallback) {
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

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
