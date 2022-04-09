const firebaseConfig = {
  apiKey: "AIzaSyDr2Hd5KlnXt1WDVup87_Gjp9S8-qHnfvM",
  authDomain: "reinielerica.firebaseapp.com",
  projectId: "reinielerica",
  storageBucket: "reinielerica.appspot.com",
  messagingSenderId: "433389581410",
  appId: "1:433389581410:web:e4581c6b061b21b1e4cd3b",
  measurementId: "G-1L437CPGZQ"
}

const init = firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const auth = firebase.auth()
export const timestamp = firebase.firestore.Timestamp
export function serverDateToday(){
  return timestamp.now().toDate()
}
export const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/* added, modified, removed */
export function live(collection, functions){
  collection.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      functions[change.type](change.doc.data())
    })
  })
}
