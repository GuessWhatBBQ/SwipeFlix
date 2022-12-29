import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoXFJQKIG9KIxDP7pNm8swX5D0FQwI6R4",
  authDomain: "swipeflix-5c387.firebaseapp.com",
  projectId: "swipeflix-5c387",
  storageBucket: "swipeflix-5c387.appspot.com",
  messagingSenderId: "729361277191",
  appId: "1:729361277191:web:a6c0492d166bf12595a5a2",
  measurementId: "G-9QGSH6ECR8",
};
export const app = initializeApp(firebaseConfig);

// Create a root reference
export const storage = getStorage(app);
