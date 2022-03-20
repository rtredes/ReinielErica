import firebase from './firebase.js'
import SignIn from './popups/signIn.js'

try {
const sign = new SignIn()
} catch(e){
  console.log(e)
}