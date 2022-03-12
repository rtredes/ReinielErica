import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"



const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider();
const storage = getStorage()

console.log(provider)

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
signInWithEmailAndPassword(auth, 'rtredes2@gmail.com', 'rein')
