import firebase from './firebase.js'

async function init(){
  console.log('signing in')
  await firebase.signIn({
    email: 'rtredes2@gmail.com',
    pass: 'Rein&Eca@2021'
  })
  console.log(firebase.auth.user)
}