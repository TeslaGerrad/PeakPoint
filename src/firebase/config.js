import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCX-TNU2TFmwEn7D8t2V8Rq-1TZXnRPOzc",
  authDomain: "pos--backoffice.firebaseapp.com",
  projectId: "pos--backoffice",
  storageBucket: "pos--backoffice.firebasestorage.app",
  messagingSenderId: "145153093814",
  appId: "1:145153093814:web:a0ad1d2779101d02a1f617",
  measurementId: "G-GRMD8L2ZRX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);