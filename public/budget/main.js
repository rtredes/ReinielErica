import firebase from '/scripts/firebase.js'
import SignIn from '/scripts/popups/signIn.js'
var uid = null
import firebase from '/scripts/firebase.js'
import SignIn from '/scripts/popups/signIn.js'


var uid = null

firebase.onAuthStateChanged(firebase.auth, init)

async function init(){
  if (!firebase.auth.currentUser) {
    new SignIn()
    return false
  }else{
    uid = firebase.auth.currentUser.uid
  }
  
  try {
  const budgetData = await firebase.getDocs(firebase.collection(firebase.db, `users/${uid}/budget`))
  alert(budgetData)
  } catch (e) {
    alert(e)
  }
}
