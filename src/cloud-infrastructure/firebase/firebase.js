import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

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

export async function getCourses() {
  const courseCollection = collection(firestore, "courses");
  const courseItems = await getDocs(courseCollection);
  const courses = courseItems.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return courses;
}

export function logCourseClicked(id, courseName) {
  logEvent(analytics, "select_course", {
    content_type: "course",
    content_id: { id },
    items: [{ name: courseName }],
  });
}

export function logAcademyStart() {
  logEvent(analytics, "browse_academy", {
    content_type: "webpage",
  });
}
