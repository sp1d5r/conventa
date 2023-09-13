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
import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import axios from "axios";
import md5 from "../utils/md5";

export const firebaseConfig = {
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
export const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const messaging = getMessaging(app);

export default auth;

/* Session Constants */
const start_time = Date.now();
let ip = null;
let session_id = null;

const NUMBER_OF_NEGOTIATION_MINIGAMES = 1;
const NUMBER_OF_EMPATHY_MINIGAMES = 10;

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
  const activityDocRef = await addDoc(
    collection(firestore, `users/${auth.currentUser.uid}/activity`),
    {
      date: date.getTime(),
      lesson_id: lesson_id,
    }
  );
  return activityDocRef;
}

export async function getLessonsCompletedForDay(uid, date) {
  // Define the start and end of the day in timestamps
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const userActivityRef = collection(firestore, `users/${uid}/activity`);
  const q = query(
    userActivityRef,
    where("date", ">=", startOfDay.getTime()),
    where("date", "<=", endOfDay.getTime())
  );
  const querySnapshot = await getDocs(q);
  let entries = 0;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    entries += 1;
  });
  return entries;
}

export async function userStreakForDay(uid, date) {
  // Set time to 00:00:00
  const entries = await getLessonsCompletedForDay(uid, date);
  return entries >= 1;
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
export async function getUserGems(uid) {
  // get user data
  const userDoc = doc(firestore, "users", uid);
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
  getUserGems(auth.currentUser.uid).then((amount) => {
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
export async function getLives(uid) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const livesRef = collection(firestore, `users/${uid}/lives`);
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
  try {
    const courseCollection = collection(firestore, "courses");
    const courseItems = await getDocs(courseCollection);
    const courses = courseItems.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    localStorage.setItem("allCourses", JSON.stringify(courses));
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);

    const cachedData = localStorage.getItem("allCourses");
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      throw new Error("Failed to fetch courses and no cached data available.");
    }
  }
}

export async function getCourse(id) {
  try {
    const courseDoc = doc(firestore, "courses", id);
    const courseItems = await getDoc(courseDoc);
    const courseData = courseItems.data();
    courseData.lessons = courseData.lessons.map((res) => res.id);

    console.log("Course Items", courseData);
    localStorage.setItem(`courses/${id}`, JSON.stringify(courseData));
    return courseData;
  } catch (error) {
    console.error("Error fetching course:", error);

    const cachedData = localStorage.getItem(`courses/${id}`);
    if (cachedData) {
      console.log("cached data is here", JSON.parse(cachedData));
      return JSON.parse(cachedData);
    } else {
      throw new Error(
        `Failed to fetch course with ID ${id} and no cached data available.`
      );
    }
  }
}

/* Lessons */
export async function getLesson(lesson_ref) {
  console.log(lesson_ref);
  const cachedData = localStorage.getItem(`lesson/${lesson_ref.id}`);

  if (cachedData) {
    // Use the cached data instead of making a new request
    return JSON.parse(cachedData);
  } else {
    const lesson_id = lesson_ref.id;
    const lessonDoc = doc(firestore, "lessons", lesson_id);
    const lessonItems = await getDoc(lessonDoc);
    const lessonData = { id: lesson_id, ...lessonItems.data() };
    localStorage.setItem(`lesson/${lesson_ref.id}`, JSON.stringify(lessonData));
    return lessonData;
  }
}

export async function getLessonFromID(lesson_id) {
  try {
    const lessonDoc = doc(firestore, "lessons", lesson_id);
    const lessonItems = await getDoc(lessonDoc);
    const lessonData = { id: lesson_id, ...lessonItems.data() };

    localStorage.setItem(`lesson/${lesson_id}`, JSON.stringify(lessonData));
    return lessonData;
  } catch (error) {
    console.error("Error fetching lesson data:", error);

    const cachedData = localStorage.getItem(`lesson/${lesson_id}`);
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      throw new Error(
        `Failed to fetch lesson data for ID ${lesson_id} and no cached data available.`
      );
    }
  }
}

export async function getLessonsCompleted(uid) {
  const userActivityRef = collection(firestore, `users/${uid}/activity`);
  const lessonActivity = query(userActivityRef, where("lesson_id", "!=", ""));
  const lessonCount = await getCountFromServer(lessonActivity);
  return lessonCount.data().count;
}

export async function hasUserCompletedLesson(lessonId) {
  const userActivityRef = collection(
    firestore,
    `users/${auth.currentUser.uid}/activity`
  );
  const lessonActivity = query(
    userActivityRef,
    where("lesson_id", "==", lessonId)
  );
  return getCountFromServer(lessonActivity)
    .then((lessonCount) => {
      return lessonCount.data().count > 0;
    })
    .catch((error) => {
      // Handle any errors that occurred during the promise execution
      console.error("Error retrieving lesson count:", error);
      // Return a default value or throw the error to be handled by the caller
      return 0;
    });
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

export function getPagefromRetrievedJSON(pageData, pageId) {
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

/* Pages */
export async function getPageFromID(page_path) {
  try {
    const pageId = page_path.split("/")[1];
    const pageDoc = doc(firestore, "pages", pageId);
    const snapshot = await getDoc(pageDoc);
    const pageData = snapshot.data().page;

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

    localStorage.setItem(page_path, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);

    const cachedData = localStorage.getItem(page_path);
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      throw new Error("Failed to fetch data and no cached data available.");
    }
  }
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

/* Empathy Minigame */
export async function getEmpathyMinigameData(numberOfGames) {
  const collectionRef = collection(firestore, "empathy-minigame");
  const snapshot = await getDocs(collectionRef);

  if (NUMBER_OF_EMPATHY_MINIGAMES === 0) {
    throw new Error("No documents found in collection");
  }

  // Shuffle the array of documents
  const shuffled = snapshot.docs.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, numberOfGames);

  // Map over the selected documents and format them
  let data = selected.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
}

/* Concessions Ladder Minigame */
async function fetchConcessionPointData(ref) {
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

export async function getConcessionsLadderMinigameData() {
  const collectionRef = collection(firestore, "concession-ladder-minigame");
  const snapshot = await getDocs(collectionRef);

  if (snapshot.empty) {
    throw new Error("No documents found in collection");
  }

  const randomIndex = Math.floor(Math.random() * snapshot.size);
  const randomDoc = snapshot.docs[randomIndex];
  const data = { id: randomDoc.id, ...randomDoc.data() };

  // Fetch concession points data
  const concessionPointsData = await Promise.all(
    data.concessionPoints.map(fetchConcessionPointData)
  );

  return {
    ...data,
    concessionPoints: concessionPointsData,
  };
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

/* Feedback */

export const sendFeedback = async (pageId, lessonId, courseId, feedback) => {
  const payload = {
    pageId: pageId,
    lessonId: lessonId,
    courseId: courseId,
    feedback: feedback,
    userId: auth.currentUser.uid,
  };

  return await addDoc(collection(firestore, `feedback`), { ...payload });
};

export const testNotifications = async () => {
  const now = new Date(new Date().getTime() - 20 * 60 * 1000);
  const startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const endTime = new Date(now.getTime() + 30 * 60 * 1000);

  const notificationRef = collection(firestore, `notifications/`);
  const q = query(
    notificationRef,
    where("notificationTime", ">=", startTime),
    where("notificationTime", "<=", endTime),
    where("notificationSent", "==", false)
  );
  const querySnapshot = await getDocs(q);

  console.log(`It's empty! ${startTime} ${endTime}`);

  if (querySnapshot.empty) console.log(`It's empty! ${startTime} ${endTime}`);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};
