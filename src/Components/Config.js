import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MEASUREMENTID
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyCst3Pkramvo3py3CMZrx5XhrLKaHbBSdk",
    authDomain: "jobproject-b61cf.firebaseapp.com",
    projectId: "jobproject-b61cf",
    storageBucket: "jobproject-b61cf.appspot.com",
    messagingSenderId: "759001133576",
    appId: "1:759001133576:web:375eace944af1d6775d7bd",
    measurementId: "G-20JCNQ0MQK"  
  
  };

  const app = initializeApp(firebaseConfig);

const auth=getAuth();
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage


export {app,auth,db,storage};