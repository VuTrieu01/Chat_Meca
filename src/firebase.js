import { initializeApp } from "firebase/app";
import * as firebase from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_AUTH_DOMAIN,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_AUTH_DOMAIN,
  messagingSenderId: process.env.REACT_APP_AUTH_DOMAIN,
  appId: process.env.REACT_APP_AUTH_DOMAIN,
  measurementId: process.env.REACT_APP_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = firebase.getAuth(app);
export { auth, firebase, database };
