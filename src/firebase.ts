// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBJ_QbXOQT2O-Iyvtwx941746M0jDA4MbI',
  authDomain: 'hapical-niconico.firebaseapp.com',
  projectId: 'hapical-niconico',
  storageBucket: 'hapical-niconico.appspot.com',
  messagingSenderId: '811738244868',
  appId: '1:811738244868:web:1bbf71061da9d2fb029251',
  measurementId: 'G-4K4L10G86X',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
