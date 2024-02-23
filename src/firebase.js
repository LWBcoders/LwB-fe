import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAC_vUZviRfJT7FULTUciy745qET2SNbZI",
  authDomain: "video-upload-7754a.firebaseapp.com",
  projectId: "video-upload-7754a",
  storageBucket: "video-upload-7754a.appspot.com",
  messagingSenderId: "405551236443",
  appId: "1:405551236443:web:dfab4aae5ce675df7e867e",
  measurementId: "G-RB81XPV9CZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const storage = getStorage(app)
export const db = getFirestore(app)
