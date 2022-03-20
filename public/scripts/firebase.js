import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js"

import { 
  getFirestore, 
  doc, 
  setDoc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"

import { 
  getStorage
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js"

import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"

const credentials = initializeApp({
  apiKey: 'AIzaSyDr2Hd5KlnXt1WDVup87_Gjp9S8-qHnfvM',
  authDomain: 'reinielerica.web.app',
  projectId: 'reinielerica',
  storageBucket: 'gs://reinielerica.appspot.com/'
});

const db = getFirestore()

const auth = getAuth()

export const signIn = async function({provider,email,pass}){
  if(provider && typeof provider == 'object') {
    return await signInWithPopup(auth, provider)
  } else {
    return await signInWithEmailAndPassword(
      auth, email, pass
    )
  }
}

export const authChanged = function(eventListener) {
  onAuthStateChanged(auth, eventListener)
}

const storage = getStorage()

export default {
  db, doc, setDoc, collection, getDocs,  
  auth, signIn, authChanged,
  google: new GoogleAuthProvider(),
  storage
}
