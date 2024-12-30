import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACx3xJPL8QQloc6MCBLEaHtfqlBqYfgA8",
  authDomain: "p33r-df1cf.firebaseapp.com",
  projectId: "p33r-df1cf",
  storageBucket: "p33r-df1cf.appspot.com",
  messagingSenderId: "1073508210502",
  appId: "1:1073508210502:web:d0bff6536d4ae5ccc43747",
  measurementId: "G-G4Z8B32PMV",
};

const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
