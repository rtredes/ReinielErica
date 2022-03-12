import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js"
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, deleteUser } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"

const a = "test"
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDr2Hd5KlnXt1WDVup87_Gjp9S8-qHnfvM',
  authDomain: 'reinielerica.web.app',
  projectId: 'reinielerica',
  storageBucket: 'gs://reinielerica.appspot.com/'
});
 
const db = getFirestore()
const auth = getAuth()

document.getElementById('signup-form').addEventListener('submit', async function(e) {
  e.preventDefault()
  
  var user = {
    name: {
      first: $('#fname', this).value,
      last: $('#lname', this).value
    },
    email: $('#email', this).value
  }

  try {
    const userCreate = await createUserWithEmailAndPassword(
      auth,
      user.email,
      $('#password').value
    ) 
    user['uid'] = auth.currentUser.uid
    
    const newUser = doc(
      db,'users', user.uid
    )
    
    const userDatabase = await setDoc(newUser, user)
    
    this.reset()
    alert('user has been created')
    
  } catch (e) {
    if(e.code.indexOf('auth') == -1)
      deleteUser(auth.currentUser)
      
    console.log(e)
    alert(e.message)
  }


  return false
})

function $(selector, target = document) {
  return target.querySelector(selector)
}

