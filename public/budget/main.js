import firebase from '/scripts/firebase.js'
import SignIn from '/scripts/popups/signIn.js'
var uid = null
firebase.authChanged( async function(){
  if(!(uid = firebase.auth.currentUser.uid)) 
  await new SignIn()
  
  const budgetData = await firebase.getDocs(firebase.collection(firebase.db, `users/${uid}/budget`))
  console.log(budgetData)
  
})
