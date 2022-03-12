import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDr2Hd5KlnXt1WDVup87_Gjp9S8-qHnfvM',
  authDomain: 'reinielerica.web.app',
  projectId: 'reinielerica',
  storageBucket: 'gs://reinielerica.appspot.com/'
});

const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider();
const storage = getStorage()
