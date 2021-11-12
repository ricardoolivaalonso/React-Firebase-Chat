import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyARQsBDn3WWpObcXbX6ZlPD3mF4bVVINlk",
    authDomain: "roa-01-f4ba9.firebaseapp.com",
    projectId: "roa-01-f4ba9",
    storageBucket: "roa-01-f4ba9.appspot.com",
    messagingSenderId: "768145900737",
    appId: "1:768145900737:web:7dbc60ceb5a49512908040"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }


