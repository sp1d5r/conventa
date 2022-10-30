import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import axios from "axios";
import md5 from "../utils/md5";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

/* Session Constants */
const start_time = Date.now();
let ip = null;
let session_id = null;

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
    content_id: { id },
    items: [
      {
        name: courseName,
        time: Date.now(),
        session: getSessionId(),
        ip: getIP(),
      },
    ],
  });
}

export function logAcademyStart() {
  logEvent(analytics, "browse_academy", {
    content_type: "webpage",
    items: [{ time: Date.now(), session: getSessionId(), ip: getIP() }],
  });
}
