import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCcyv_2Z1C1u5SljfXfir-MSUqlOpLBP1M",
  authDomain: "lwb-the-coders.firebaseapp.com",
  projectId: "lwb-the-coders",
  storageBucket: "lwb-the-coders.appspot.com",
  messagingSenderId: "734162474889",
  appId: "1:734162474889:web:9d427b01b6c751c14cf358",
  measurementId: "G-N7E0CEVSPY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const storage = getStorage(app)
export const db = getFirestore(app)
