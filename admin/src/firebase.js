import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0ZHDMv9Fs8wmK8tTAGBf9VNmekRuq-Vc",
  authDomain: "swipeflix2.firebaseapp.com",
  projectId: "swipeflix2",
  storageBucket: "swipeflix2.appspot.com",
  messagingSenderId: "939730682313",
  appId: "1:939730682313:web:6997cbe80f5690e2406818",
  measurementId: "G-FYTJPEZV23",
};
export const app = initializeApp(firebaseConfig);

// Create a root reference
export const storage = getStorage(app);
